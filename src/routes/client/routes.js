const express = require('express');
const { creationValidate } = require('./functions');
const router = express.Router();

router.get('/')

router.post('/register', async (req,res) => {

    const {email, password, repassword, name, birthday, gender} = req.body

    const errors = await creationValidate({
        email, password, repassword, name, birthday, gender
    })

    if(errors != false){
        return res.json({message: errors, body: req.body})
    }

    return res.json({
        message:'todos os dados estão corretos, e a conta foi criada!'
    })

})

module.exports = router;