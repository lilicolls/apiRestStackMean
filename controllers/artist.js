'use strict'
const path = require('path');
const fs = require ('fs');
const mongoosePaginate = require('mongoose-pagination')

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

function getArtists(req,res){
    const page = req.params.page || 1;
    const itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err,artists,total)=>{
        if (err){
            res.status(500).send({message: 'ha ocurrido un error en la peticion'})
        }else{
            if(!artists){
                res.status(404).send({message: 'no hay artistas almacenados'})
            }else{
                return res.status(200).send({
                    total_items: total,
                    artists: artists
                })
            }
        }

    })
}

function updateArtist(req,res){
    const artistId = req.params.id;
    const update = req.body;

    Artist.findByIdAndUpdate(artistId,update, (err, artistUpdated)=>{
        if (err){
            res.status(500).send({message: 'Error en la peticion'})
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'el artista no ha sido actualizado'})
            }else{
                res.status(200).send({artist: artistUpdated})
            }
        }
    })

}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist
}