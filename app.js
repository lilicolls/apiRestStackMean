'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
// CARGAR RUTAS
const user_router = require ('./routes/user');
const artist_router = require ('./routes/artist')
const album_router = require('./routes/album')
const song_router = require ('./routes/song')
//app.use(bodyParser.urlencoded({limit: '50mb', extended:false, parameterLimit: 50000}));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json()); //convierte a obj json los datos de las peticiones recibidas por http

// configurar cabeceras http

//ruta base
app.use('/api', user_router)        
app.use('/api', artist_router) 
app.use ('/api', album_router)
app.use('/api', song_router)

module.exports = app;