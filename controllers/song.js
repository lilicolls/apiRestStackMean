'use strict'
const path = require('path');
const fs = require ('fs');
const mongoosePaginate = require('mongoose-pagination')

const Artist = require('../models/artist');
const Album = require('../models/album')
const Song = require ('../models/song')

function getSong(req,res){
    //obtener una cancion
    const songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song)=>{
    
        if (err){
            res.status(500).send({message: 'error en la peticion'})
        }else{
            if(!song){
                res.status(404).send({message: 'la cancion no existe'})
            }else{
                res.status(200).send({song})
            }
        }
    })
}

function getSongs(req,res){
    //metodo para listar las canciones
    const albumId = req.params.id;

    if(!albumId){
        var find = Song.find({}).sort('number')
    }else{
        var find = Song.find({album: albumId}).sort('number')
    }

    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            models: 'Artist'
        }
    }).exec((err, songs)=>{
        if (err){
            res.status(500).send({message: 'error en la peticion'})
        }else{
            if(!songs){
                res.status(404).send({message: 'no hay canciones almacenadas!'})
            }else{
                res.status(200).send({songs: songs})
            }
        }
    })
}

function saveSong(req,res){
    const song = new Song()
    const params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album


    song.save((err,songStored)=>{
        if (err){
            res.status(500).send({message: 'error en la peticion'})
        }else{
            if(!songStored){
                res.status(404).send({message: 'no se ha guardado la cancion'})
            }else{
                res.status(200).send({song: songStored})
            }
        }
    })
}

function updateSong(req,res){
    const songId = req.params.id;
    const update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated)=>{
        if (err){
            res.status(500).send({message: 'error en la peticion'})
        }else{
            if(!songUpdated){
                res.status(404).send({message: 'no se ha actualizado la cancion'})
            }else{
                res.status(200).send({song: songUpdated})
            }
        }
    })
}

function deleteSong(req,res){
    const songId = req.params.id;

    Song.findByIdAndRemove(songId, (err, songRemoved)=>{
        if (err){
            res.status(500).send({message: 'ocurrio un error en la peticion'})
        }else{
            if(!songRemoved){
                res.status(404).send({message:'no se ha borrado la cancion'})
            }else{
                res.status(200).send({songRemoved})
            }
        }
    })
}

function uploadFile (req,res){
    var songId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.file.path;
		// console.log(file_path);
		var file_split = file_path.split('\/');
		var file_name = file_split[2];
		// console.log(file_split);
		var ext_split = (file_name.split('\.'));
		var file_ext = ext_split[1];
		// console.log(file_ext);

		if((file_ext == 'mp3') || (file_ext == 'ogg')){
			Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
				if(!songUpdated){
					res.status(404).send({message: 'no se ha podido actualizar la cancion'});
				}else{
					res.status(200).send({message: songUpdated});
				}
			});
		}else{
			res.status(200).send({message: 'Extension del archivo no valida'});
		}
	}else{
        res.status(200).send({message: 'No has subido ninguna cancion :('})
    }
}

function getSongFile(req,res){
    const songFile = req.params.songFile;
    const path_file = './uploads/songs/' + songFile

   
    fs.exists(path_file,  (exists)=>{
        if(exists){
            res.status(200).sendFile(path.resolve(path_file))
        }else{
            res.status(404).send({message: 'la imagen no existe'})
        }
    })

}

module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}