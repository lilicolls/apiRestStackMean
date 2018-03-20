'use strict'
const path = require('path');
const fs = require ('fs');
const mongoosePaginate = require('mongoose-pagination')

const Artist = require('../models/artist');
const Album = require('../models/album')
const Song = require ('../models/song')

function getAlbum(req,res){
   const albumId = req.params.id;
    //path la propiedad donde se van a cargar los datos del objeto asociado
    //tomando el id que esta almacenado en la propiedad artist obtener el documento
    //asociado a ese id
   Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=>{
       if (err){
        res.status(500).send({message: 'ha ocurrido un error en la peticion'})
       }else{
        if (!album){
            res.status(404).send({message: 'no existe el album'})
        }else{
            res.status(200).send({album})
        }   
       }
   }) 
}

function saveAlbum(req,res){
    const album = new Album()
    const params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null'
    album.artist = params.artist

    album.save((err, albumStored)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'})
        }else {
            if(!albumStored){
                res.status(404).send({message: 'no se ha almacenado el album'})
            }else{
                res.status(200).send({album: albumStored})
            }
        }
    })
}

module.exports = {
    getAlbum,
    saveAlbum
}