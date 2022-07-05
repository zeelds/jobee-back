const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Review = database.define('Review', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    stars: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reviewed_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: 'id'
    },
    reviewer_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: 'id'
    }
})

module.exports = Review;