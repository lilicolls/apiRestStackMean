'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
// CARGAR RUTAS
const user_router = require ('./routes/user');

//app.use(bodyParser.urlencoded({limit: '50mb', extended:false, parameterLimit: 50000}));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json()); //convierte a obj json los datos de las peticiones recibidas por http

// configurar cabeceras http

//ruta base
app.use('/api', user_router)        

module.exports = app;