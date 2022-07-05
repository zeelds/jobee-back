
const validator = require('email-validator')
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
        }, {
            where: 'repassword',
            content: 'As senhas não coincidem.'
        })
    };

    return errors

}

module.exports = { creationValidate }