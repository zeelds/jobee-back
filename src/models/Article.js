const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Article = database.define('Article', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('publicado', 'rascunho'),
        allowNull: false
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true
    },
    author_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: 'id'
    }
})

module.exports = Article;