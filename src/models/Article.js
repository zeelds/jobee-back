const Sequelize = require('express')
const database = require('../database/db')

const Article = database.define('Article', {
    _id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('publicado', 'rascunho'),
        allowNull: false
    },
    tags: {
        type: Sequelize.JSON,
        allowNull: true
    },
    author_id: {
        type: Sequelize.UUID,
        references: 'User',
        referencesKey: '_id'
    }
})

module.exports = Article;