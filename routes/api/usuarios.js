const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");
const {check, validationResult} = require("express-validator");
const {Departamento, Cargo, Usuario} = require("../../models/sequelize");

// @route   GET api/usuarios
// @desc    Retorna todos os usuarios
// @access  Private
router.get("/", [auth], async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: {exclude: ["senha"]},
        });
        res.json(usuarios);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   GET api/usuarios/:id
// @desc    Retorna usuario especificado
// @access  Private
router.get("/:id", [auth], async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            include: [Cargo, Departamento],
            attributes: {exclude: ["senha"]},
        });
        res.json(usuario);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   POST api/usuarios/
// @desc    Adiciona usuario
// @access  Private
router.post(
    "/",
    [
        auth,
        [
            check("nome", "Nome é obrigatório").not().isEmpty(),
            check("email", "Email é obrigatório").not().isEmpty(),
            check("senha", "Senha precisa ter mais de 6 caracteres").isLength({
                min: 6,
            }),
            check("departamento", "Departamento é obrigatório").not().isEmpty(),
            check("cargo", "Cargo é obrigatório").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const existente = await Usuario.findAll({
                where: {
                    email: req.body.email,
                },
            });

            if (existente.length > 0) {
                return res.status(400).json({
                    errors: [{message: "Já existe um usuário com esse email"}],
                });
            }

            const salt = await bcrypt.genSalt(10);
            const senha = await bcrypt.hash(req.body.senha, salt);

            const novo = await Usuario.create({
                id: uuidv4(),
                nome: req.body.nome,
                email: req.body.email,
                senha: senha,
                DepartamentoId: req.body.departamento,
                CargoId: req.body.cargo,
            });

            res.json(novo);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Erro de servidor");
        }
    }
);

// @route   DELETE api/usuarios/:id
// @desc    Deleta usuario especificado
// @access  Private
router.delete("/:id", [auth], async (req, res) => {
    try {
        const item = await Usuario.findByPk(req.params.id, {
            attributes: {exclude: ["senha"]},
        });
        if (!item) {
            return res.status(404).json({msg: "Item não encontrado"});
        }

        await Usuario.destroy({
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

// @route   PUT api/usuarios/:id
// @desc    Atualiza usuario especificado
// @access  Private
router.put("/:id", [auth], async (req, res) => {
    try {
        const existente = await Usuario.findByPk(req.params.id);

        if (existente.length == 0) {
            return res.status(404).json({
                errors: [{message: "Item não encontrado"}],
            });
        }

        const {nome, senha, cargo, departamento, email} = req.body;

        const modificado = {
            nome: nome !== null ? nome : existente.nome,
            email: email !== null ? email : existente.email,
            CargoId: cargo !== null ? cargo : existente.CargoId,
            DepartamentoId:
                departamento !== null ? departamento : existente.DepartamentoId,
        };

        if (senha !== undefined) {
            const salt = await bcrypt.genSalt(10);
            const senhaNova = await bcrypt.hash(senha, salt);
            modificado.senha = senhaNova;
        }

        await Usuario.update(
            {
                ...modificado,
            },
            {where: {id: req.params.id}}
        );

        const atualizado = await Usuario.findByPk(req.params.id, {
            include: [Cargo, Departamento],
            attributes: {exclude: ["senha"]},
        });

        res.json(atualizado);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro de servidor");
    }
});

module.exports = router;
