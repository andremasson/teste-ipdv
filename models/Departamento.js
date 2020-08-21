module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Departamento", {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CentroDeCustoId: {
            type: DataTypes.UUIDV4,
            field: "centro_de_custo_id",
        },
    });
};
