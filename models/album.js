'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {type: Schema.ObjectId,
        ref: 'Artist'} //Guardar un id de otro obj almacenado en la bdd
                    // en este caso hace referencia al id de un obj de tipo 'Artist'

});


module.exports = mongoose.model('Album', AlbumSchema)