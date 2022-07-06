const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Pro = database.define('Pro', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    plan: {
        type: DataTypes.ENUM('Nenhum','Padrão', 'Investido', 'Profissional'),
        defaultValue: 'Nenhum'
    },
    begindate: {
        type: DataTypes.DATE,
    },
    expirationdate: {
        type: DataTypes.DATE,
    },
    user_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: 'id'
    }
})

module.exports = Pro;