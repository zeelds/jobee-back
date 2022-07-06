
const express = require('express');
const ProController = require('../../controllers/ProController');
const { verifyJWT } = require('../client/functions');
const router = express.Router();

router.post('/checkout', verifyJWT, async (req,res)=>{

    //essa rota só vai ser chamada depois de concluir uma transição pelo react paypal

    const {plan, payment_data} = req.body
    const user_id = req.user_id

    //checar se o pagamento é real mesmo
    
    if(!payment_data){
        return res.json({type: 'error', message: 'Ocorreu um erro ao cadastrar o Usuário Pro.'})
    }

    const newPro = await ProController.createPro(plan,'2023/01/01', user_id)

    return res.json({type: 'success', message: 'Usuário Pro cadastro com sucesso!'})

})

module.exports = {router}