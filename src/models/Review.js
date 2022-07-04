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

    },
    content: {

    },
    reviewed_id: {

    },
    reviewer_id: {
        
    }
})