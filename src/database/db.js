const Sequelize = require('sequelize')
const dbConfig = require('../config/dbconfig')

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize