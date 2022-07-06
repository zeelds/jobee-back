const express = require('express');
const app = express();
require('dotenv/config');
const mainRoutes = require('./routes/main/routes');
const adminRoutes = require('./routes/admin/routes');
const clientRoutes = require('./routes/client/routes');
const articleRoutes = require('./routes/article/routes')
const bodyParser = require('body-parser');
require('./database/db')
require('./database/start')
const cors = require('cors');
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', mainRoutes)
app.use('/admin', adminRoutes)
app.use('/client', clientRoutes)
app.use('/article', articleRoutes)
app.use(cors())

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.SERVER_PORT}`)
})

//O server será iniciado aqui