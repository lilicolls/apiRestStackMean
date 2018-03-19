'use strict'
const path = require('path');
const fs = require ('fs');

const Artist = require('../models/artist');
const Album = require('../models/album')
const Song = require ('../models/song')

function getArtist(req,res){
    //metodo para extraer artista de la bdd
    res.status(200).send({message: 'metodo get artist del controlador artist.js'})
}

module.exports = {
    getArtist
}