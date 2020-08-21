module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "CentroDeCusto",
        {
            id: {
                type: DataTypes.UUIDV4,
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
};
