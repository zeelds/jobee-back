const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Review = database.define('Review', {
    _id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    stars: {
        type: DataTypes.NUMBER,
        defaultValue: 0.0,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reviewed_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: '_id'
    },
    reviewer_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: '_id'
    }
})

module.exports = Review;