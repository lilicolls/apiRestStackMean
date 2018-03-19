'use strict'

const express = require('express')
const ArtistController = require('../controllers/artist')

const api = express.Router();
const md_auth = require('../middlewares/aunthenticated')


api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist)
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist)
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists) //? para decir que el parametro es opcional 
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist)
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist)

module.exports = api
