'use strict'

const jwt = require('jwt-simple')
const moment = require ('moment')
const secret = 'clave_secreta_curso'

//generar token de usuario con los datos del usuario loggeado en la bdd

exports.createToken = function(user){
    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    }

    return jwt.encode(payload, secret)
}