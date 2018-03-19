'use strict'
const path = require('path');
const fs = require ('fs');
const mongoosePaginate = require('mongoose-pagination')

const Artist = require('../models/artist');
const Album = require('../models/album')
const Song = require ('../models/song')

function getAlbum(req,res){
    res.status(200).send({message: 'probonado controlador album'})
}

module.exports = {
    getAlbum
}