const Sequelize = require('sequelize')
const database = require('../database/db')

const User = database.define('User', {
    _id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    },
    biography: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: 'default.png'
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    gender: {
        type: Sequelize.ENUM("Masculino", "Feminino", "Outros", "Prefiro não dizer"),
        defaultValue: "Prefiro não dizer"
    },
    contact: {
        type: Sequelize.JSON,
        allowNull: true
    },
    tags: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    ban_info: {
        type: Sequelize.JSON,
        allowNull: true
    }
});

module.exports = User;