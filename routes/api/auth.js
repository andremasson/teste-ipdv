const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const {check, validationResult} = require("express-validator");

const {Usuario} = require("../../models/sequelize");

// @route   GET api/auth
// @desc    Retorna usuário logado
// @access  Public
router.get("/", auth, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id, {
            attributes: {exclude: ["senha"]},
        });
        res.json(usuario);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro de servidor");
    }
});

// @route   POST api/auth
// @desc    Autentica e pega token
// @access  Public
router.post(
    "/",
    [
        check("email", "Entre seu email").isEmail(),
        check("senha", "Senha é obrigatória").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, senha} = req.body;

        try {
            const usuario = await Usuario.findOne({
                where: {
                    email,
                },
            });
            console.log(usuario);
            if (!usuario) {
                return res.status(400).json({
                    errors: {
                        message: "Credencial inválida",
                    },
                });
            }

            const senhaIgual = await bcrypt.compare(senha, usuario.senha);

            if (!senhaIgual) {
                return res.status(400).json({
                    errors: {
                        message: "Credencial inválida",
                    },
                });
            }

            const payload = {
                usuario: {
                    id: usuario.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {expiresIn: 360000},
                (err, token) => {
                    if (err) throw err;

                    res.json({token});
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Erro de servidor");
        }
    }
);

module.exports = router;
