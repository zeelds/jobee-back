const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Inbox = database.define('inbox', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    target_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Inbox;