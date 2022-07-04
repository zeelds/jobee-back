const express = require('express')
const router = express.Router();
const {randomUUID} = require('crypto')

router.get('/', (req, res) => {
    return res.json({
        reqId: randomUUID(),
        message: 'A rota inicial está funcionando como esperado.',
        body: req.body
    })
})

module.exports = router