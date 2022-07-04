const Sequelize = require('sequelize')
const database = require('../database/db')

const Login = database.define("Login", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: Sequelize.UUID,
        references: 'User',
        referencesKey: '_id'
    }
})

module.exports = Login;