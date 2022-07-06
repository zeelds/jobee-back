const sequelize = require("sequelize");
const Pro = require("../models/Pro");

module.exports = {

    async createPro(plan,expirationdate, user_id){

        const newPro = await Pro.create({
            plan: plan,
            begindate: Date.now(),
            expirationdate,
            user_id: user_id
        })

        return {data: newPro, message: 'Usuário Pro criado com sucesso!', status: 200}

    },

    async getPro(user_id){

        const foundPro = await Pro.findOne({
            where: {user_id: user_id}
        })

        return {data: foundPro, message: 'Usuário Pro encontrado com sucesso!', status: 200}
        
    },

    async getAllPro(){

        const foundPro = await Pro.findAll()

        return {data: foundPro, message: 'Usuários encontrados com sucesso!', status: 200}
        
    },

    async updatePro(plan,expirationdate, user_id){

        const updatedPro = await Pro.update({
            plan: plan,
            expirationDate: expirationdate
        },{
            where: {user_id: user_id}
        })

        return {data: updatedPro, message: 'Usuário Pro atualizado com sucesso!', status: 200}

    },

    async deletePro(user_id){

        const deletedPro = await Pro.destroy({
            where: {user_id: user_id}
        })

        return {data: deletedPro, message: 'Usuário Pro deletado com sucesso!', status: 200}
        
    }

}
