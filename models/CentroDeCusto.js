const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const CentroDeCusto = sequelize.define(
    "CentroDeCusto",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "centro_de_custos",
    }
);

module.exports = CentroDeCusto;
