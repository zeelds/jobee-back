const Sequelize = require('express')
const database = require('../database/db')

const Comment = database.define('Comment', {
    _id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author_id: {
        type: Sequelize.UUID,
        references: 'User',
        referencesKey: '_id'
    },
    article_id: {
        type: Sequelize.UUID,
        references: 'Article',
        referencesKey: '_id'
    }
})

module.exports = Comment;