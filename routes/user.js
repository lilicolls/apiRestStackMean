'use strict'

const express = require ('express')
const UserController = require ('../controllers/user')

const api = express.Router();
const md_auth = require('../middlewares/aunthenticated')

api.get('/probando-controlador',md_auth.ensureAuth ,UserController.pruebas); //para llamar middleware en una ruta se agrega como 2do parametro
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);


module.exports = api