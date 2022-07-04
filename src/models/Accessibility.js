const Sequelize = require('sequelize')
const database = require('../database/db')

const Accessibility = database.define('Accessibility', {
    _id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    unlettered: {
        type: Sequelize.BOOLEAN
    },
    pronouns: {
        type: Sequelize.ENUM('Ele', 'Ela', 'Elu')
    },
    color_blindness: {
        type: Sequelize.ENUM('Deuteranomalia', 'Protanomalia', 
        'Protanopia', 'Deuteranopia',
        'Tritanomalia', 'Tritanopia',
        'Total'
        )
    },
    user_id: {
        type: Sequelize.UUID,
        references: 'User',
        referencesKey: '_id'
    }
});

module.exports = Accessibility;