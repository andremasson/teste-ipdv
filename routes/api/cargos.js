const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const {check, validationResult} = require("express-validator");
const Cargo = require("../../models/Cargo");

// @route   GET api/cargos
// @desc    Retorna todos os cargos
// @access  Public
router.get("/", async (req, res) => {
    try {
        const cargos = await Cargo.findAll();
        res.json(cargos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   GET api/cargos/:id
// @desc    Retorna cargo especificado
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const cargo = await Cargo.findByPk(req.params.id);
        res.json(cargo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   POST api/cargos
// @desc    Cria um cargo
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
            const existente = await Cargo.findAll({
                where: {
                    nome: req.body.nome,
                },
            });

            if (existente.length > 0) {
                return res.status(400).json({
                    errors: [{message: "Item já existe"}],
                });
            }

            const novo = await Cargo.create({
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

// @route   DELETE api/cargos
// @desc    Deleta um cargo
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const item = await Cargo.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({msg: "Item não encontrado"});
        }

        await Cargo.destroy({
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

// @route   DELETE api/cargos
// @desc    Deleta um cargo
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
            const existente = await Cargo.findByPk(req.params.id);

            if (existente.length == 0) {
                return res.status(404).json({
                    errors: [{message: "Item não encontrado"}],
                });
            }

            await Cargo.update(
                {nome: req.body.nome},
                {where: {id: req.params.id}}
            );

            const atualizado = await Cargo.findByPk(req.params.id);

            res.json(atualizado);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Erro de servidor");
        }
    }
);

module.exports = router;
