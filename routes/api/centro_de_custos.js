const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const {check, validationResult} = require("express-validator");
const {CentroDeCusto, Departamento} = require("../../models/sequelize");

// @route   GET api/centro_de_custos
// @desc    Retorna todos os centros de custos
// @access  Public
router.get("/", async (req, res) => {
    try {
        const centroDeCustos = await CentroDeCusto.findAll();
        res.json(centroDeCustos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   GET api/centro_de_custos/:id
// @desc    Retorna centro de custo especificado
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const centroDeCusto = await CentroDeCusto.findByPk(req.params.id, {
            include: Departamento,
        });
        res.json(centroDeCusto);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   POST api/centro_de_custos
// @desc    Cria um centro de custo
// @access  Public
router.post(
    "/",
    [check("nome", "Nome é obrigatório").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const existente = await CentroDeCusto.findAll({
                where: {
                    nome: req.body.nome,
                },
            });

            if (existente.length > 0) {
                return res.status(400).json({
                    errors: [{message: "Item já existe"}],
                });
            }

            const novo = await CentroDeCusto.create({
                id: uuidv4(),
                nome: req.body.nome,
            });

            res.json(novo);
        } catch (error) {
            console.error(err.message);
            res.status(500).send("Erro de servidor");
        }
    }
);

// @route   DELETE api/centro_de_custos/:id
// @desc    Deleta um centro de custo
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const item = await CentroDeCusto.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({msg: "Item não encontrado"});
        }

        await CentroDeCusto.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({msg: "Item removido"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   PUT api/centro_de_custos/:id
// @desc    Atualiza um centro de custo
// @access  Public
router.put(
    "/:id",
    [check("nome", "Nome é obrigatório").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const existente = await CentroDeCusto.findByPk(req.params.id);

            if (existente.length == 0) {
                return res.status(404).json({
                    errors: [{message: "Item não encontrado"}],
                });
            }

            await CentroDeCusto.update(
                {nome: req.body.nome},
                {where: {id: req.params.id}}
            );

            const atualizado = await CentroDeCusto.findByPk(req.params.id);

            res.json(atualizado);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Erro de servidor");
        }
    }
);

module.exports = router;
