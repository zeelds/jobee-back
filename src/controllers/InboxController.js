const Inbox = require("../models/Inbox")

module.exports = {
    
    async createInbox(values){

        const {target_id, content, title} = values

        const createdInbox = await Inbox.create({target_id, content, title})

        return createdInbox

    },
    async getAllInbox(values){

        const {target_id} = values

        const foundInbox = await Inbox.findAll({where: {target_id: target_id}, order: [['created_at', 'desc']]})

        return foundInbox

    },
    async deleteInbox(values){

        const {id, target_id} = values

        const deletedInbox = await Inbox.destroy({where: {id: id, target_id: target_id}})

        return deletedInbox

    },
    async updateInbox(values){

        const {id, content, title} = values

        const updatedInbox = await Inbox.update({content, title}, {where: {id: id}})

        return updatedInbox

    }
}