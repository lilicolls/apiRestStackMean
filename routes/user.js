'use strict'

const express = require ('express')
const UserController = require ('../controllers/user')

const api = express.Router();

api.get('/probando-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);


module.exports = api