const express = require('express');
const app = express();
require('dotenv/config');
const mainRoutes = require('./routes/main/main');
const bodyParser = require('body-parser');
require('./database/db')
require('./database/start')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', mainRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
})

//O server será iniciado aqui