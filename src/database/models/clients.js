'use strict'

module.exports = (sequelize, DataTypes) => {
    let Clients = sequelize.define('clients', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        paranoid: true, // Se habilita el borrado logico
        freezeTableName: true,
    });

    Clients.associate = models => {
        // Aqui se podrian definir relaciones que fueran necesarias
    }

    return Clients;
}