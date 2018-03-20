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

function getAlbums(req,res){
    //metodo para obtener los albums almacenados
    const artistId = req.params.artist;
    if (!artistId){
        //sacar todos los albums de la bdd
        var find = Album.find({}).sort('title')
    }else{
       // sacar los albums de un artista en especifico
       var find = Album.find({artist: artistId}).sort('year')
    }

    find.populate({path: 'artist'}).exec((err, albums)=>{
        if (err){
            res.status(500).send({message: 'ha ocurrido un error en la peticion'})
        }else{
            if(!albums){
                res.status(404).send({message: 'no existe ese album'})
            }else{
                res.status(200).send({albums})
            }
        }

    })
}

function updateAlbum(req,res){
    const albumId = req.params.id
    const update = req.body

    Album.findByIdAndUpdate(albumId,update, (err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'ha ocurrido un error en la peticion'})
        }else{
            if(!albumUpdated){
                res.status(404).send({message: ' no existe el album'})
            }else{
                res.status(200).send({album: albumUpdated})
            }
        }
    })
}

function deleteAlbum(req,res){
    const albumId = req.params.id;

    Album.findByIdAndRemove(albumId ,(err, albumRemoved)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'})
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'el album no existe'})
            }else{
                console.log("el album se ha eliminado")
                Song.find({album: albumRemoved._id}).remove((err, songRemoved)=>{
                    if (err){
                        res.status(500).send({message: 'error en la peticion'})
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message: 'la cancion no se ha eliminado'})
                        }else{
                            res.status(200).send({album: albumRemoved})
                        }
                    }
                })
            }
        }

    })
}

function uploadImage(req,res){
    const albumId = req.params.id;
    var file_name = 'no subido'
    console.log(albumId)
    if(req.files){
        var file_path = req.files.image.path;       //ruta del archivo
        var file_split = file_path.split('\/')
         file_name = file_split[2]
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]
        
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg'){
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated)=>{
                if (err){
                    res.status(500).send({message:'ocurrio un error en la peticion '})
                }else {
                    if(!albumUpdated){
                        res.status(404).send({message: 'el album no se ha actualizado'})
                    }else{
                        res.status(200).send({album: albumUpdated})
                    }
                }
            })

        }else{
            res.status(200).send({message: 'extension del archivo no valido'})
        }

    }else{
        res.status(200).send({message: 'no has subido ninguna imagen'})
    }

}

function getImageFile(req,res){
    const imageFile = req.params.imageFile;
    const path_file = './uploads/album/' + imageFile;
    console.log(path_file)
    fs.exists(path_file, (exists)=>{
        if (exists){
            res.status(200).sendFile(path.resolve(path_file))
        }else{
            res.status(404).send({message: 'no existe la imagen'})
        }
    })

}


module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}