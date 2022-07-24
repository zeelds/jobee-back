const { DataTypes } = require('sequelize');
const database = require('../database/db')

const User = database.define('User', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    biography: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: '/avatar/default.png'
    },
    isverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    gender: {
        type: DataTypes.ENUM("Masculino", "Feminino", "Outros", "Prefiro não dizer"),
        defaultValue: "Prefiro não dizer"
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ban_info: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = User;