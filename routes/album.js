'use strict'

const express = require('express')
const AlbumController = require('../controllers/album');
const api = express.Router()
const md_auth = require('../middlewares/aunthenticated')
const multipart = require('connect-multiparty')
const md_upload = multipart({uploadDir: './uploads/album'})

api.get('/album', md_auth.ensureAuth, AlbumController.getAlbum)

module.exports = api