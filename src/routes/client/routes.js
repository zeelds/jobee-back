const express = require('express');
const { creationValidate } = require('./functions');
const router = express.Router();

router.get('/')

router.post('/register', async (req,res) => {

    //const errors = creationValidate
    //if creationValidate return errors

    return res.json({message: 'registrando...', body: req.body})

})

module.exports = router;