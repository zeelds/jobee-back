const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    return res.json(JSON.stringify({
        message: 'rota inicial'
    }))
})

module.exports = router