const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({msg: "Acesso negado"});
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        req.usuario = decoded.usuario;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token inválido"});
    }
};
