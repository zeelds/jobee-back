const Sequelize = require('express')
const database = require('../database/db')

const Review = database.define('Review', {
    _id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    stars: {
        type: Sequelize.NUMBER,
        defaultValue: 0.0,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    reviewed_id: {
        type: Sequelize.UUID,
        references: 'User',
        referencesKey: '_id'
    },
    reviewer_id: {
        type: Sequelize.UUID,
        references: 'User',
        referencesKey: '_id'
    }
})

module.exports = Review;