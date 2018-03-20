'use strict'
const path = require('path');
const fs = require ('fs');
const mongoosePaginate = require('mongoose-pagination')

const Artist = require('../models/artist');
const Album = require('../models/album')
const Song = require ('../models/song')

function getSong(req,res){
    res.status(200).send({message: 'controlador cancion'})
}

module.exports = {
    getSong
}