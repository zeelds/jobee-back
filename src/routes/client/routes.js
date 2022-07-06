const express = require('express');
const UserController = require('../../controllers/UserController');
const { verifyJWT, creationValidate } = require('./functions');
const router = express.Router();
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

router.get('/', verifyJWT, (req,res) => {
    return res.json({type: 'success', message: 'Você está autenticado!'})
})

router.post('/register', async (req, res) => {

    const { email, password, repassword, name, birthday, gender, unlettered,pronouns,color_blindness } = req.body

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
        const newAcessibility = UserController.createAccessibility(unlettered, pronouns, color_blindness, user_id)

        const verifyToken = jwt.sign(user_id, process.env.SECRET_JWT)
        //vai ser enviado pro email ^^^^^^

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

router.post('/redefine-accessibility', verifyJWT, async (req,res) => {

    const {unlettered,pronouns,color_blindness} = req.body

    const newAcessibility = await UserController.updateAccessibility({unlettered,pronouns,color_blindness,user_id})

    if (newAcessibility.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na redefinição de acessibilidade.' })
    }

    return res.json({ type: 'success', message: 'A acessibilidade foi redefinida.', body: updatedLogin })

})

router.post('/redefine-password', async (req, res) => {

    const token = req.body.token
    const email = jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        return decoded.email
    })
    const newPassword = req.body.password

    const updatedLogin = await UserController.updateLogin({ password: newPassword, email: email })

    if (updatedLogin.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na redefinição de senha.' })
    }

    return res.json({ type: 'success', message: 'A senha foi redefinida.', body: updatedLogin })

})

router.get('/reviews-list/:user_id', async (req,res) => {

    const user_id = req.params.user_id

    const foundReviews = await UserController.getAllReviews(user_id)

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    return res.json({ type: 'success', data: foundReviews})

})

router.get('/review/:id', async (req,res) => {

    const id = req.params.id

    const foundReviews = await UserController.getReview(id)

    if (foundReviews.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro ao buscar a avaliação.' })
    }

    return res.json({type: 'success', data: foundReviews})

})

router.post('/write-review', verifyJWT, async (req,res) => {
    
    //fazer um check pra ver se o reviewed n é igual ao reviewers

    const reviewer_id = req.body.user_id
    const reviewed_id = req.body.reviewed_id
    const stars = req.body.stars
    const content = req.body.content

    if(reviewer_id == reviewed_id){
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    const newReview = await UserController.createReview(stars, content, reviewed_id, reviewer_id)

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    return res.json({type: 'success', message: newReview})

})


router.post('/edit-review', verifyJWT, async (req,res) => {
    
    const id = req.body.id
    const stars = req.body.stars
    const content = req.body.content
    const user_id = req.body.user_id

    const newReview = await UserController.updateReview({id, stars, content, user_id})

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na atualização da avaliação.' })
    }

    return res.json({type: 'success', message: newReview})

})

router.post('/delete-review', verifyJWT, async (req,res) => {
    
    const id = req.body.id
    const user_id = req.body.user_id

    const newReview = await UserController.updateReview(id, user_id)

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro ao excluir esta avaliação.' })
    }

    return res.json({type: 'success', message: newReview})

})

module.exports = router;