const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Cargo = sequelize.define("Cargo", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Cargo;
