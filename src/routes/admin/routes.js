const express = require('express')
const router = express.Router();
const UserController = require('../../controllers/UserController.js');
const { creationValidate } = require('../client/functions.js');
const jwt = require('jsonwebtoken')


router.get('/', async (req, res) => {

    //const Users = await UserController.teste()
    //return res.json(Users)

})



module.exports = router