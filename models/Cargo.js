module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Cargo", {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
