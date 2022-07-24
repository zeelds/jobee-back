const express = require('express')
const InboxController = require('../../controllers/InboxController')
const router = express.Router()
const { verifyJWT } = require('../client/functions')

router.get('/get-inbox', verifyJWT, async(req,res)=>{

    const user_id = req.user_id

    const foundInbox = InboxController.getAllInbox({target_id: user_id})

    return foundInbox

})

router.create('/create-inbox', verifyJWT, async(req,res)=>{

    const user_id = req.user_id
    const {content, title} = req.body

    const createdInbox = InboxController.createInbox({target_id: user_id , content, title})

    return createdInbox
    
})


router.get('/delete-inbox', verifyJWT, async(req,res)=>{

    const user_id = req.user_id
    const id = req.body.id

    const deletedInbox = InboxController.getAllInbox({where: {target_id: user_id, id: id}})

    return deletedInbox

})

module.exports = router