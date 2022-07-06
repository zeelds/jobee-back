const express = require('express')
const router = express.Router();
const UserController = require('../../controllers/UserController.js');
const { verifyJWT_admin } = require('../client/functions.js');
const jwt = require('jsonwebtoken')

router.get('/', verifyJWT_admin, async (req, res) => {

    return res.json('vc está autenticadx na rota admin')
    //const Users = await UserController.teste()
    //return res.json(Users)

})

router.post('/create-pro-user', verifyJWT_admin, (req,res) => {
    return res.json('vc está autenticadx na rota')
})

router.post('/update-pro-user', verifyJWT_admin, (req,res) => {
    return res.json('vc está autenticadx na rota')
})

router.post('/pro-users', verifyJWT_admin, (req,res) => {
    return res.json('mostra todos os usuários pro')
})

router.post('/delete-pro-user', verifyJWT_admin, (req,res) => {
    return res.json('vc está autenticadx na rota')
})

module.exports = router