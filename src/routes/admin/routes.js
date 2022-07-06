const express = require('express')
const router = express.Router();
const { verifyJWT_admin } = require('../client/functions.js');
const ProController = require('../../controllers/ProController.js');

router.get('/', async (req, res) => {

    const foundProUsers = await ProController.getAllPro()

    return res.json({data: foundProUsers})

})

router.post('/create-pro-user', verifyJWT_admin, async (req,res) => {
    const {plan,expirationdate,user_id} = req.body

    const newProUser = await ProController.createPro(plan,expirationdate, user_id)

    return res.json({data: newProUser, message: 'Usuário Pro criado com sucesso', status: 200})
})

router.post('/update-pro-user', verifyJWT_admin, async (req,res) => {
    const {plan,expirationdate,user_id} = req.body

    const updatedProUser = await ProController.updatePro(plan,expirationdate,user_id)

    return res.json({data: updatedProUser, message: 'Usuário Pro atualizado com sucesso', status: 200})
})

router.post('/delete-pro-user', verifyJWT_admin, async (req,res) => {
    const user_id = req.body.user_id

    const deletedProUser = await ProController.deletePro(user_id)

    return res.json({data: deletedProUser, message: 'Usuário Pro deletado com sucesso', status: 200})
})

module.exports = router