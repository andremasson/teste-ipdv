const config = require("config");
const Sequelize = require("sequelize");
const dialect = config.get("dialect");
const database = config.get("database");
const host = config.get("host");
const user = config.get("user");
const password = config.get("password");

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
});

module.exports = sequelize;
