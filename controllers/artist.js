'use strict'
const path = require('path');
const fs = require ('fs');

const Artist = require('../models/artist');
const Album = require('../models/album')
const Song = require ('../models/song')

function getArtist(req,res){
    //metodo para extraer artista de la bdd
    const artistId = req.params.id;

    Artist.findById(artistId, (err,artist)=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'})
        }else{
            if (!artist){
                res.status(404).send({message: 'El artista no existe'})
            }else{
                res.status(200).send({artist})
            }
        }

    })
  
}

function saveArtist (req,res ){
    const artist = new Artist()
    const params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    console.log(artist)
    artist.save((err, artistStored)=>{
        if(err){
            res.status(500).send({message: 'error al guardar el artista'})

        }else {
            if (!artistStored){
                res.status(404).send ({message: 'no se ha almacenado el artista'})
            }else {
                res.status(200).send({artist: artistStored})
            }
        }

    })
}

module.exports = {
    getArtist,
    saveArtist
}