'use strict'

const jwt = require('jwt-simple')
const moment = require ('moment')
const secret = 'clave_secreta_curso'


//middleware para validar token
exports.ensureAuth = function (req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'la peticion no tine cabecera de autenticacion'})
    }
   // console.log("algo")
    let token = req.headers.authorization.replace (/['"]+/g, '') //obtengo el token que viene en la cabecera de la peticion y elimino comillas
    //res.send({token})
      try{
        //valido el token
        var payload = jwt.decode(token,secret)
        if (payload.exp < moment().unix()){
            return res.status(401).send({message: 'EL token ha expirado'})

        }
    }
    catch(ex){
     //   console.log(ex)
        return res.status(404).send({message: 'token no es valido'})
    } 
    req.user = payload; //a la peticion recibida le agrego el payload del token
    next(); 
}