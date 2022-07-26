const express = require('express')
const InboxController = require('../../controllers/InboxController')
const router = express.Router()
const { verifyJWT } = require('../client/functions')

router.get('/get-inbox', verifyJWT, async(req,res)=>{

    const user_id = req.user_id

    const foundInbox = await InboxController.getAllInbox({target_id: user_id})

    if(foundInbox == false) return res.json(false)
    
    return res.json(foundInbox)

})

router.post('/create-inbox', verifyJWT, async(req,res)=>{

    const user_id = req.user_id
    const {content, title} = req.body

    const createdInbox = await InboxController.createInbox({target_id: user_id , content, title})

    return res.json(createdInbox)
    
})


router.post('/delete-inbox', verifyJWT, async(req,res)=>{

    const user_id = req.user_id
    const id = req.body.id

    const deletedInbox = await InboxController.deleteInbox({target_id: user_id, id: id})

    return res.json(deletedInbox)

})

module.exports = router