const User = require('../models/User')
const Login = require('../models/Login')
const Accessibility = require('../models/Accessibility')
const Review = require('../models/Review')
const sequelize = require('sequelize')

module.exports = {

    async getAllUsers(){

        const Users = await User.findAll()

        return {data: Users, message: 'Busca finalizada com sucesso!', status: 200}

    },

    async createReview(stars, content, reviewed_id, reviewer_id){

        const newReview = await Review.create({
            stars: stars,
            content: content,
            reviewed_id: reviewed_id,
            reviewer_id: reviewer_id
        }) 
        
        return {data: newReview, message: 'Avaliação criada com sucesso!', status: 200}

    },

    async updateReview(values){

        const {id, stars, content, user_id} = values

        const newReview = await Review.update(
            {
                stars: stars,
                content: content
            },
            {where: {id: id, reviewer_id: user_id}}
        )

        return {data: newReview, message: 'Avaliação atualizada com sucesso!', status: 200}

    },

    async getAllReviews(reviewed_id){

        const foundReviews = await Review.findAll({where: {reviewed_id: reviewed_id}})

        return {data: foundReviews, message: 'Busca finalizada com sucesso!', status:200}

    },

    async getReview(id){

        const foundReviews = await Review.findOne({where: {id: id}})

        return {data: foundReviews, message: 'Busca finalizada com sucesso!', status:200}

    },

    async deleteReview(id, user_id){

        const removedReview = await Review.destroy({where: {id: id, reviewer_id: user_id}})

        return {data: removedReview, message: 'Avaliação excluída com sucesso!', status:200}

    },

    async createLogin(email,password,user_id){

        const newLogin = await Login.create({
            email: email,
            password: password,
            isverified: false,
            user_id: user_id
        })
        
        return {data: newLogin, message: 'conta criada', status: 200}

    },

    async updateLogin(values){

        const {password, email} = values

        const newLogin = await Login.update(
            {
                password: password
            },
            {where: {email: email}}
        )

        return {data: newLogin, message: 'Login atualizado com sucesso!', status: 200}

    },

    async updateVerifiedStatus(values){

        const {isverified, user_id} = values

        const newVerify = await Login.update(
            {
                isverified: isverified,
            },
            {where: {user_id: user_id}}
        )

        return {data: newVerify, message: 'Usuário verificado com sucesso!', status: 200}

    },

    async updatePassword(values){

        const {password, user_id} = values

        const newPassword = await Login.update(
            {
                password: password,
            },
            {where: {user_id: user_id}}
        )

        return {data: newPassword, message: 'Senha atualizada com sucesso!', status: 200}

    },

    async getLogin(email){

        const foundLogin = await Login.findOne({where: {email: email}})

        return {data: foundLogin, message: 'Busca finalizada com sucesso!', status:200}

    },

    async deleteLogin(email){

        const removedLogin = await Login.destroy({where: {email: email}})

        return {data: removedLogin, message: 'Login excluído com sucesso!', status:200}

    },

    async createUser(name,gender,birthday){

        const newUser = await User.create({
            name: name,
            gender: gender,
            birthday: birthday
        }) 
        
        return {data: newUser, message: 'Usuário criado com sucesso!', status: 200}

    },

    async updateUser(values){

        const {id, name, title, biography, isverified, gender, birthday, contact, tags} = values

        const newUser = await User.update(
            {
                name: name,
                title: title,
                biography: biography,
                isverified: isverified,
                gender: gender,
                birthday: birthday,
                contact: contact,
                tags: tags
            },
            {where: {id: id}}
        )

        return {data: newUser, message: 'Usuário atualizado com sucesso!', status: 200}

    },

    async updateAvatar(avatar, id){

        const newAvatar = await User.update({avatar: avatar},{where: {id: id}})

        return {data: newAvatar, message: 'Avatar atualizado com sucesso!', status: 200}

    },

    async getUser(id){

        const foundUser = await User.findOne({where: {id: id}})

        return {data: foundUser, status:200}

    },

    async deleteUser(id){

        const removedUser = await User.destroy({where: {id: id}})

        return {data: removedUser, message: 'Usuário excluído com sucesso!', status:200}

    },

    async createAccessibility(unlettered,pronouns,color_blindness, user_id){

        const newConfig = await Accessibility.create({
            unlettered: unlettered,
            pronouns: pronouns,
            color_blindness: color_blindness,
            user_id: user_id
        })
        
        return {data: newConfig, message: 'Acessibilidade criada com sucesso!', status: 200}

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

        return {data: newAcessibility, message: 'Acessibilidade atualizada com sucesso!', status: 200}

    },

    async getAccessibility(user_id){

        const foundAccessibility = await Accessibility.findOne({where: {user_id: user_id}})

        return {data: foundAccessibility, message: 'Busca finalizada com sucesso!', status:200}

    },

    async deleteAccessibility(id){

        const removedAccessibility = await Accessibility.destroy({where: {id: id}})

        return {data: removedAccessibility, message: 'Acessibilidade excluída com sucesso!', status:200}

    }



}