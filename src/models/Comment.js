const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Comment = database.define('Comment', {
    _id: {
        type: DataTypes.UUID,
        autoIncrement: true,
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
        referencesKey: '_id'
    },
    article_id: {
        type: DataTypes.UUID,
        references: 'Article',
        referencesKey: '_id'
    }
})

module.exports = Comment;