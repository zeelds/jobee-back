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
        return res.json({type: 'error', message: errors})
    }

    const newUser = UserController.createUser(name,gender,birthday)

    newUser.then((response)=>{

        const user_id = response.message.id

        const newLogin = UserController.createLogin(email,password,user_id)
        const newAcessibility = UserController.createAccessibility(false,'Ele','Nenhum',user_id)

        return res.json({message: user_id+' foi registrado com sucesso!'})

    }).catch((errors)=>{

        return res.json({type: 'error', errors: errors})

    })


})

router.post('/auth', async (req,res)=>{
    
    const {email, password} = req.body

    const combination = await UserController.getLogin(email)

    if(
        combination.message != null
        &&
        email == combination.message.email
        &&
        password == combination.message.password
    ){
        return res.json({email: email, password: password, token: 'token-here'})
    }

    return res.json({message: 'As credenciais estão incorretas!'})

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