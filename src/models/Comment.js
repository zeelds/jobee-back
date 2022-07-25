const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Comment = database.define('Comment', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: 'id'
    },
    article_id: {
        type: DataTypes.UUID,
        references: 'Article',
        referencesKey: 'id'
    }
})

module.exports = Comment;
