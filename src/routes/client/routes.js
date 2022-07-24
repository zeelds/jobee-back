const express = require('express');
const UserController = require('../../controllers/UserController');
const { verifyJWT, creationValidate, sendVerificationMail, checkPro } = require('./functions');
const router = express.Router();
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const upload = require('../../config/multer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_PASSWORD,
    },
    secure: true,
});

router.get('/', verifyJWT, (req, res) => {
    return res.json({ type: 'success', message: 'Você está autenticado!' })
})

router.get('/refresh-token', verifyJWT, (req, res) => {
    return res.json(req.user_id)
})

//Envio de e-mail, testes:

router.post('/register', async (req, res) => {

    const { email, password, repassword, name, birthday, gender, unlettered, pronouns, color_blindness } = req.body

    const errors = await creationValidate({
        email, password, repassword, name, birthday, gender
    })

    if (errors != false) {
        console.log(errors)
        return res.json({ type: 'error', message: 'Ocorreu algum erro na criação, verifique os campos novamente.', errors: errors})
    }

    const [day, month, year] = birthday.split('/')
    const formattedBirthday = new Date(year,month-1,day)

    const newUser = UserController.createUser(name, gender, formattedBirthday)

    newUser.then((response) => {

        const user_id = response.data.id

        const newLogin = UserController.createLogin(email, password, user_id)
        const newAcessibility = UserController.createAccessibility(unlettered, pronouns, color_blindness, user_id)

        const verifyToken = jwt.sign({ verify_user_id: user_id }, process.env.SECRET_JWT, { expiresIn: 27000 })

        sendVerificationMail(transporter, email, verifyToken)

        return res.json({ type: 'success', message: 'Você foi registrado com sucesso, verifique seu email!'})

    }).catch((errors) => {

        return res.json({ type: 'error', message: 'Ocorreu algum erro na criação, verifique os campos novamente.', errors: errors })

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

        if (!combination.data.isverified) {

            const verifyToken = jwt.sign({ verify_user_id: combination.data.user_id }, process.env.SECRET_JWT, { expiresIn: 27000 })

            sendVerificationMail(transporter, email, verifyToken)

            return res.json({ auth: false, type: 'error', message: 'A conta precisa ser ativada, verifique o seu email!' })
        }

        const token = jwt.sign(
            { user_id: combination.data.user_id },
            process.env.SECRET_JWT,
            { expiresIn: 84600 }
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

    const user_id = jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.json('Esse código de verificação expirou...')
        }

        return decoded.verify_user_id
    })

    const updatedVerify = await UserController.updateVerifiedStatus({ isverified: true, user_id: user_id.toString() })

    if (updatedVerify.data == 0) {
        return res.json({ type: 'error', message: 'Essa conta não pôde ser verificada no momento.' })
    }

    return res.json({ type: 'success', message: 'Você teve sua conta verificada!' })

})

router.post('/upload-avatar', upload.single('avatar'), verifyJWT, async (req, res) => {

    const user_id = req.user_id

    const isPro = await checkPro(['Investido','Profissional','Padrão'], user_id)

    if (
        isPro == false
        &&
        req.file.mimetype == 'image/gif'
    ) {
        return res.json(
            {
                type: 'error',
                message: 'A imagem não foi adicionada porque o usuário não é Usuário Pro!',
                filename: req.file.filename
            }
        )
    }

    return res.json(
        {
            type: 'success',
            message: 'Imagem adicionada com sucesso!',
            filename: req.file.filename
        }
    )

})

router.post('/change-avatar', verifyJWT, async (req, res) => {

    const avatar = req.body.avatar
    const user_id = req.user_id

    const newAvatar = await UserController.updateAvatar(avatar, user_id)

    return res.json({ type: 'success', data: newAvatar, message: 'Você atualizou seu avatar!' })

})

router.post('/redefine-accessibility', verifyJWT, async (req, res) => {

    const { unlettered, pronouns, color_blindness } = req.body
    const user_id = req.user_id

    const newAcessibility = await UserController.updateAccessibility({ unlettered, pronouns, color_blindness, user_id })

    if (newAcessibility.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na redefinição de acessibilidade.' })
    }

    return res.json({ type: 'success', message: 'A acessibilidade foi redefinida.', data: newAcessibility })

})

router.get('/get-accessibility', verifyJWT, async (req, res) => {

    const user_id = req.user_id

    const foundAccessibility = await UserController.getAccessibility(user_id)

    if (foundAccessibility.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na busca de acessibilidade.' })
    }

    return res.json({ type: 'success', message: 'A acessibilidade foi buscada.', data: foundAccessibility })

})

router.post('/redefine-user', verifyJWT, async (req, res) => {

    const { name, title, biography, gender, birthday, contact, tags } = req.body
    const id = req.user_id

    const newUser = await UserController.updateUser({
        id, name, title, biography, isverified: false, gender, birthday, contact, tags
    })

    if (newUser.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na redefinição de usuário.' })
    }

    return res.json({ type: 'success', message: 'O usuário foi redefinida.', body: newUser })

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

router.get('/get-user/:id', async (req, res) => {

    const id = req.params.id

    const foundUser = await UserController.getUser(id)

    const isPro = await checkPro(['Padrão','Investido','Profissional'], id)

    return res.json({type: 'success', message: 'Usuário encontrado', data: {
        foundUser: foundUser,
        isPro: isPro
    }})

})

router.get('/get-user', verifyJWT, async (req, res) => {

    const user_id = req.user_id

    const foundUser = await UserController.getUser(user_id)

    const isProInvested = await checkPro(['Investido'], user_id)
    const isProProfessional = await checkPro(['Investido'], user_id)

    return res.json({type: 'success', message: 'Usuário encontrado', data: {
        foundUser: foundUser,
        proStatus: {
            invested: isProInvested,
            professional: isProProfessional
        }
    }})

})

router.get('/reviews-list/:user_id', async (req, res) => {

    const user_id = req.params.user_id

    const foundReviews = await UserController.getAllReviews(user_id)

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    return res.json({ type: 'success', data: foundReviews })

})

router.get('/reviews-list', verifyJWT, async (req, res) => {

    const user_id = req.user_id

    const foundReviews = await UserController.getAllReviews(user_id)

    if (foundReviews.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    return res.json({ type: 'success', data: foundReviews })

})

router.get('/review/:id', async (req, res) => {

    const id = req.params.id

    const foundReviews = await UserController.getReview(id)

    if (foundReviews.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro ao buscar a avaliação.' })
    }

    return res.json({ type: 'success', data: foundReviews })

})

router.post('/write-review', verifyJWT, async (req, res) => {

    //fazer um check pra ver se o reviewed n é igual ao reviewers

    const reviewer_id = req.user_id
    const reviewed_id = req.body.reviewed_id
    const stars = req.body.stars
    const content = req.body.content

    if (reviewer_id == reviewed_id) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    const newReview = await UserController.createReview(stars, content, reviewed_id, reviewer_id)

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro no envio da avaliação.' })
    }

    return res.json({ type: 'success', message: newReview })

})


router.post('/edit-review', verifyJWT, async (req, res) => {

    const id = req.body.id
    const stars = req.body.stars
    const content = req.body.content
    const user_id = req.user_id

    const newReview = await UserController.updateReview({ id, stars, content, user_id })

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro na atualização da avaliação.' })
    }

    return res.json({ type: 'success', message: newReview })

})

router.post('/delete-review', verifyJWT, async (req, res) => {

    const id = req.body.id
    const user_id = req.user_id

    const newReview = await UserController.updateReview(id, user_id)

    if (newReview.data == 0) {
        return res.json({ type: 'error', message: 'Ocorreu algum erro ao excluir esta avaliação.' })
    }

    return res.json({ type: 'success', message: newReview })

})

module.exports = router;