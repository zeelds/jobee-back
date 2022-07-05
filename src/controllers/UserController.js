const User = require('../models/User')
const Login = require('../models/Login')
const Accessibility = require('../models/Accessibility')

module.exports = {

    async getAllUsers(){

        const Users = await User.findAll()

        return {message: Users, status: 200}

    },

    //Verificações

    async matchingPassword(password, repassword){

        if(password == repassword){
            return {message: 'as senhas combinam'}
        }

        return {message: 'as senhas não combinam'}

    },

    //Fim das verificações

    async createLogin(email,password,user_id){

        const newLogin = await Login.create({
            email: email,
            password: password,
            isverified: false,
            user_id: user_id
        }) 
        
        return {message: 'conta criada', status: 200, newLogin}

    },

    async updateLogin(values){

        const {password, isverified, user_id} = values

        const newLogin = await Login.update(
            {
                password: password,
                isverified: isverified,
            },
            {where: {user_id: user_id}}
        )

        return {message: newLogin, status: 200}

    },

    async getLogin(email){

        const foundLogin = await Login.findOne({where: {email: email}})

        return {message: foundLogin, status:200}

    },

    async deleteLogin(email){

        const removedLogin = await Login.destroy({where: {email: email}})

        return {message: removedLogin, status:200}

    },

    async createUser(name,gender,birthday){

        const newUser = await User.create({
            name: name,
            gender: gender,
            birthday: birthday
        }) 
        
        return {message: newUser, status: 200}

    },

    async updateUser(values){

        const {id, name, title, biography, avatar, isverified, gender, birthday, contact, tags, ban_info} = values

        const newUser = await User.update(
            {
                name: name,
                title: title,
                biography: biography,
                avatar: avatar,
                isverified: false,
                gender: gender,
                birthday: birthday,
                contact: contact,
                tags: tags,
                ban_info: ban_info
            },
            {where: {id: id}}
        )

        return {message: newUser, status: 200}

    },

    async getUser(id){

        const foundUser = await User.findOne({where: {id: id}})

        return {message: foundUser, status:200}

    },

    async deleteUser(id){

        const removedUser = await User.destroy({where: {id: id}})

        return {message: removedUser, status:200}

    },

    async createAccessibility(unlettered,pronouns,color_blindness){

        const newConfig = await Accessibility.create({
            unlettered: unlettered,
            pronouns: pronouns,
            color_blindness: color_blindness
        })
        
        return {message: newConfig, status: 200}

    },

    async updateAccessibility(values){

        const {unlettered,pronouns,color_blindness,user_id} = values

        const newAcessibility = await Accessibility.update(
            {
                unlettered: unlettered,
                pronouns: pronouns,
                color_blindness: color_blindness
            },
            {where: {user_id: user_id}}
        )

        return {message: newAcessibility, status: 200}

    },

    async getAccessibility(user_id){

        const foundAccessibility = await Accessibility.findOne({where: {user_id: user_id}})

        return {message: foundAccessibility, status:200}

    },

    async deleteAccessibility(id){

        const removedAccessibility = await Accessibility.destroy({where: {id: id}})

        return {message: removedAccessibility, status:200}

    }



}