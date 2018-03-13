'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
// CARGAR TUTAS

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //convierte a obj json los datos de las peticiones recibidas por http

// configurar cabeceras http

//rutas base

module.exports = app;