const User = require('../models/User')
const Login = require('../models/Login')
const Accessibility = require('../models/Accessibility')
const Comment = require('../models/Comment')

module.exports = {

    async getAllUsers(){

        const Users = await User.findAll()

        return {message: Users, status: 200}

    },

    async teste(){

        const newUser = await User.create({
            name: 'nemo',
            title: 'design de carros',
            biography: 'sou um desenvolvedor de carros feliz da vida',
            isverified: true,
            gender: 'Masculino'
        }) 
        
        return {message: newUser, status: 200}

    }

}