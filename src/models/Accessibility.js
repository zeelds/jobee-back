const { DataTypes } = require('sequelize');
const database = require('../database/db')

const Accessibility = database.define('Accessibility', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    unlettered: {
        type: DataTypes.BOOLEAN
    },
    pronouns: {
        type: DataTypes.ENUM('Ele', 'Ela', 'Elu')
    },
    color_blindness: {
        type: DataTypes.ENUM('Deuteranomalia', 'Protanomalia', 
        'Protanopia', 'Deuteranopia',
        'Tritanomalia', 'Tritanopia',
        'Total'
        )
    },
    user_id: {
        type: DataTypes.UUID,
        references: 'User',
        referencesKey: 'id'
    }
});

module.exports = Accessibility;