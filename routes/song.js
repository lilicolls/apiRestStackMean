'use strict'

const express = require('express')
const SongController = require('../controllers/song');
const api = express.Router()
const md_auth = require('../middlewares/aunthenticated')
const multipart = require('connect-multiparty')
const md_upload = multipart({uploadDir: './uploads/songs'})

api.get('/song/:id?', md_auth.ensureAuth, SongController.getSong)

module.exports = api