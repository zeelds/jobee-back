const {Sequelize} = require('sequelize')
const dbConfig = require('../config/dbconfig');

/*
const Accessibility = require('../models/Accessibility');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Login = require('../models/Login');
const Review = require('../models/Review');
const User = require('../models/User');
*/

const database = new Sequelize(dbConfig);

/*
Accessibility.init(database)
Article.init(database)
Comment.init(database)
Login.init(database)
Review.init(database)
User.init(database)
*/

module.exports = database;