const express = require('express');
const UserController = require('../../controllers/UserController');
const { creationValidate } = require('./functions');
const router = express.Router();

router.get('/')

router.post('/register', async (req,res) => {

    const {email, password, repassword, name, birthday, gender} = req.body

    const errors = await creationValidate({
        email, password, repassword, name, birthday, gender
    })

    if(errors != false){
        return res.json({message: errors, body: req.body})
    }

    const newUser = UserController.createUser(name,gender,birthday)

    newUser.then((response)=>{

        const user_id = response.message.id

        const newLogin = UserController.createLogin(email,password,user_id)
        const newAcessibility = UserController.createAccessibility(false,'Ele','Nenhum',user_id)

        return res.json({message: user_id+' foi registrado com sucesso!'})

    }).catch((errors)=>{

        return res.json({errors: errors})

    })


})

router.get('/verify/:id', async (req,res)=>{

    const user_id = req.params.id

    const updatedVerify = await UserController.updateVerifiedStatus(true, user_id)

    if(!updatedVerify.message){
        return res.json({message: user_id+' teve sua conta verificada!'})
    }

    return res.json({message: 'Essa conta não pôde ser verificada no momento.'})

})

module.exports = router;