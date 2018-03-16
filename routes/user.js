'use strict'

const express = require ('express')
const UserController = require ('../controllers/user')

const api = express.Router();
const md_auth = require('../middlewares/aunthenticated')
const multipart = require('connect-multiparty') //permite la subida de ficheros
const md_upload = multipart({uploadDir: './uploads/users'}) //middleware con el metodo multipart que indica la ruta donde se almacenaran los archivos subidos


api.get('/probando-controlador',md_auth.ensureAuth ,UserController.pruebas); //para llamar middleware en una ruta se agrega como 2do parametro
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser) //para actualizar datos
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload], UserController.uploadImage)
api.get('/get-image-user/:imageFile', UserController.getImageFile)

module.exports = api