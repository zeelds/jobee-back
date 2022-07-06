const express = require('express');
const UserController = require('../../controllers/UserController');
const { verifyJWT, creationValidate } = require('./functions');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/', verifyJWT, (req,res) => {
    return res.json({type: 'success', message: 'Você está autenticado!'})
})

router.get('/teste', (req,res) => {
    
    const teste = jwt.sign({ user_id: '8d2bc591-9aca-4f86-ac3a-d59e02cddcd3' },
        process.env.SECRET_JWT)

    return res.json(teste)

})

router.post('/register', async (req, res) => {

    const { email, password, repassword, name, birthday, gender } = req.body

    const errors = await creationValidate({
        email, password, repassword, name, birthday, gender
    })

    if (errors != false) {
        return res.json({ type: 'error', message: errors })
    }

    const newUser = UserController.createUser(name, gender, birthday)

    newUser.then((response) => {

        const user_id = response.data.id

        const newLogin = UserController.createLogin(email, password, user_id)
        const newAcessibility = UserController.createAccessibility(false, 'Ele', 'Nenhum', user_id)

        const verifyToken = jwt.sign(user_id, process.env.SECRET_JWT)
        //vai ser enviado pro email

        return res.json({ message: user_id + ' foi registrado com sucesso!' })

    }).catch((errors) => {

        return res.json({ type: 'error', errors: errors })

    })


})

router.post('/auth', async (req, res) => {

    const { email, password } = req.body

    const combination = await UserController.getLogin(email)

    if (
        combination.data != null
        &&
        email == combination.data.email
        &&
        password == combination.data.password
    ) {

        if(!combination.isverified){
            return res.json({ auth: false, type: 'error', message: 'A conta precisa ser ativada, verifique o seu email!' })
        }

        const token = jwt.sign(
            { user_id: combination.data.user_id },
            process.env.SECRET_JWT,
            {expiresIn: 3000}
        );

        return res.json({ auth: true, token: token })
    }

    return res.json({ auth: false, type: 'error', message: 'As credenciais estão incorretas!' })

})

router.get('/verify/:token', async (req, res) => {

    //Um botão do front pro email que manda de volta pro front, mas passando um 
    //Parâmetro na url que assim que a página abre, envia uma req pra essa rota
    //E confirma a conta :-)

    const token = req.params.token

    const user_id = jwt.verify(token, process.env.SECRET_JWT, (err, decoded)=>{
        return decoded.user_id
    })

    const updatedVerify = await UserController.updateVerifiedStatus({ isverified: true, user_id: user_id.toString() })

    if (updatedVerify.data == 0) {
        return res.json({ type: 'error', message: 'Essa conta não pôde ser verificada no momento.' })
    }

    return res.json({ type: 'success', message: 'Você teve sua conta verificada!' })

})

router.post('/redefine-password', async (req, res) => {

    //Vai enviar algo criptografado aqui e ele vai tentar ser transformado no email
    //da pessoa
    const email = req.body.email
    const newPassword = req.body.password

    const updatedLogin = await UserController.updateLogin({ password: newPassword, email: email })

    if (updatedLogin.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na redefinição de senha.' })
    }

    return res.json({ type: 'success', message: 'A senha foi redefinida.', body: updatedLogin })

})

module.exports = router;