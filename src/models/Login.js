const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Login = database.define("Login", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: '_id'
    }
})

module.exports = Login;