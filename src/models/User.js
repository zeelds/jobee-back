const Sequelize = require('sequelize')
const database = require('../database/db')

const User = database.define('template', {
    campo1: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    campo2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    campo3: {
        type: Sequelize.DOUBLE
    },
});

module.exports = User;