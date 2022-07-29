
const validator = require('email-validator')
const jwt = require('jsonwebtoken')
const ProController = require('../../controllers/ProController')
const UserController = require('../../controllers/UserController')

async function creationValidate(values) {

    const { email, password, repassword, name, birthday, gender } = values

    let errors = []

    if (!email) {
        errors.push({
            where: 'email',
            content: 'Este campo não pode estar em branco.'
        })
    }
    else if (!validator.validate(email)) {
        errors.push({
            where: 'email',
            content: 'O e-mail precisa ser válido.'
        })
    }
    else {
        const foundLogin = await UserController.getLogin(email)

        if (foundLogin.data) {
            errors.push({
                where: 'email',
                content: 'O e-mail digitado já está vinculado a uma conta.'
            })
        };
    }

    if (!password) {
        errors.push({
            where: 'password',
            content: 'Este campo não pode estar em branco.'
        })
    }
    else if (password.length <= 5) {
        errors.push({
            where: 'password',
            content: 'A senha deve conter mais de 5 caracteres.'
        })
    };

    if (!repassword) {
        errors.push({
            where: 'repassword',
            content: 'Este campo não pode estar em branco.'
        })
    };

    if (!name) {
        errors.push({
            where: 'name',
            content: 'Este campo não pode estar em branco.'
        })
    };

    if (!birthday) {
        errors.push({
            where: 'birthday',
            content: 'Este campo não pode estar em branco.'
        })
    };

    if (!gender) {
        errors.push({
            where: 'gender',
            content: 'Este campo não pode estar em branco.'
        })
    }
    else if (!['Masculino', 'Feminino', 'Prefiro não dizer', 'Outros'].includes(gender)) {
        errors.push({
            where: 'gender',
            content: 'Você selecionou um gênero desconhecido.'
        })
    };

    if (password != repassword) {
        errors.push({
            where: 'password',
            content: 'As senhas não coincidem.'
        })
    };

    return errors

}

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false, message: 'Você precisa estar autenticado para acessar essa rota.' , err: err});

        req.user_id = decoded.user_id
        next()
    })
}


function verifyJWT_admin(req, res, next) {
    const token = req.headers['x-access-token']
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false, message: 'Você precisa estar autenticado como admin para acessar essa rota.' });

        req.isAdmin = decoded.isAdmin
        next()
    })
}

function sendVerificationMail(transporter, to, token) {

    const mailData = {
        from: process.env.COMPANY_EMAIL,
        to: to,
        subject: 'Verifique a sua conta da plataforma Jobee',
        text: 'link abaixo!',
        html: "<b>Olá, esperamos que nossa plataforma supere as suas expectativas! </b><br> Muitíssimo obrigado por se cadastrar e dar seu voto de confiança neste projeto. <br /> Agora você só precisa <b><a href="+("https://api-jobee.herokuapp.com")+"/client/verify/" + token + "'>clicar aqui para verificar sua conta</a></b>!<br/>"
    };

    transporter.sendMail(mailData)

}

async function checkPro(mustBe, user_id) {

    const foundPro = await ProController.getPro(user_id)

    if (
        foundPro.data != null
        &&
        mustBe.includes(foundPro.data.plan)
    ) {
        return true
    }

    return false

}


module.exports = { verifyJWT, creationValidate, sendVerificationMail, verifyJWT_admin, checkPro }