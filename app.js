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
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X.Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next()
})


//ruta base
app.use('/api', user_router)        
app.use('/api', artist_router) 
app.use ('/api', album_router)
app.use('/api', song_router)

module.exports = app;