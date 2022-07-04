const Sequelize = require('sequelize')
const dbConfig = require('../config/dbconfig')

const database = new Sequelize(dbConfig);

module.exports = database