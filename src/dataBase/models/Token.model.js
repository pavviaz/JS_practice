const Sequelize = require('sequelize');
const { sequelize } = require('..');

class Token extends Sequelize.Model {}

Token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        value: {
            type: Sequelize.STRING(192, true),
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'token', timestamps: false }
);

module.exports = Token