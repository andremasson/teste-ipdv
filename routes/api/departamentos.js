const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {v4: uuidv4} = require("uuid");
const {check, validationResult} = require("express-validator");
const {Departamento, CentroDeCusto} = require("../../models/sequelize");

// @route   GET api/departamentos
// @desc    Retorna todos os departamentos
// @access  Private
router.get("/", [auth], async (req, res) => {
    try {
        const departamentos = await Departamento.findAll({
            include: CentroDeCusto,
        });
        res.json(departamentos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   GET api/departamentos/:id
// @desc    Retorna departamentos especificado
// @access  Private
router.get("/:id", [auth], async (req, res) => {
    try {
        const departamentos = await Departamento.findByPk(req.params.id, {
            include: CentroDeCusto,
        });
        res.json(departamentos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   POST api/departamentos/
// @desc    Adiciona departamento
// @access  Private
router.post(
    "/",
    [
        auth,
        [
            check("nome", "Nome é obrigatório").not().isEmpty(),
            check("centroDeCusto", "Centro de Custo é obrigatório")
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const existente = await Departamento.findAll({
                where: {
                    nome: req.body.nome,
                },
            });

            if (existente.length > 0) {
                return res.status(400).json({
                    errors: [{message: "Item já existe"}],
                });
            }

            const novo = await Departamento.create({
                id: uuidv4(),
                nome: req.body.nome,
                CentroDeCustoId: req.body.centroDeCusto,
            });

            res.json(novo);
        } catch (error) {
            console.error(err.message);
            res.status(500).send("Erro de servidor");
        }
    }
);

// @route   DELETE api/departamentos/:id
// @desc    Deleta departamentos especificado
// @access  Private
router.delete("/:id", [auth], async (req, res) => {
    try {
        const item = await Departamento.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({msg: "Item não encontrado"});
        }

        await Departamento.destroy({
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

// @route   PUT api/departamentos/:id
// @desc    Atualiza departamentos especificado
// @access  Private
router.put("/:id", [auth], async (req, res) => {
    try {
        const existente = await Departamento.findByPk(req.params.id);

        if (existente.length == 0) {
            return res.status(404).json({
                errors: [{message: "Item não encontrado"}],
            });
        }

        const {nome, centroDeCusto} = req.body;

        const modificado = {
            nome: nome !== null ? nome : existente.nome,
            CentroDeCustoId:
                centroDeCusto !== null
                    ? centroDeCusto
                    : existente.CentroDeCustoId,
        };

        await Departamento.update(
            {...modificado},
            {where: {id: req.params.id}}
        );

        const atualizado = await Departamento.findByPk(req.params.id, {
            include: CentroDeCusto,
        });

        res.json(atualizado);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});
module.exports = router;
