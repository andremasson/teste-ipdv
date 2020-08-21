const config = require("config");
const {Sequelize, DataTypes} = require("sequelize");
const dialect = config.get("dialect");
const database = config.get("database");
const host = config.get("host");
const user = config.get("user");
const password = config.get("password");
const DepartamentoModel = require("./Departamento");
const CentroDeCustoModel = require("./CentroDeCusto");
const CargoModel = require("./Cargo");
const UsuarioModel = require("./Usuario");

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
});

const Departamento = DepartamentoModel(sequelize, DataTypes);
const CentroDeCusto = CentroDeCustoModel(sequelize, DataTypes);
const Cargo = CargoModel(sequelize, DataTypes);
const Usuario = UsuarioModel(sequelize, DataTypes);

Departamento.belongsTo(CentroDeCusto);
CentroDeCusto.hasMany(Departamento);

Usuario.belongsTo(Cargo);
Usuario.belongsTo(Departamento);

Cargo.hasMany(Usuario);
Departamento.hasMany(Usuario);

module.exports = {Departamento, CentroDeCusto, Cargo, Usuario};
