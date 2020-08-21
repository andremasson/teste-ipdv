module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Usuario", {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CargoId: {
            type: DataTypes.UUIDV4,
            field: "id_cargo",
        },
        DepartamentoId: {
            type: DataTypes.UUIDV4,
            field: "id_departamento",
        },
    });
};
