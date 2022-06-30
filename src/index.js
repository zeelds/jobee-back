const express = require('express')
const app = express()
require('dotenv/config')

app.get('/', (req,res) => {
    res.send('Testando...')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
})

//O server será iniciado aqui