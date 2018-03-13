'use strict'
const bcrypt = require ('bcrypt-nodejs') //modulo para encriptar contraseña
const User = require('../models/user')

function pruebas (req,res){
    res.status(200).send({
        message:'probando accion del controlador'
    });
}
//metodo para el registro de usuarios
function saveUser(req,res){
    const user = new User();
    const params = req.body;

    console.log(params)
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null'

    if (params.password){
        //encriptar contraseña y guardarla
        bcrypt.hash(params.password, null, null, function (err,hash){
            user.password = hash;
            if(user.name != null && user.surname!= null && user.email != null){
                //guardar usuario
                user.save((err, userStored)=>{
                    if (err) {
                        res.status(200).send({message: 'error al guardar el usuario'})

                    }else {
                        if(!userStored){
                            res.status(404).send({message: 'no se ha registrado el usuario'})
                        }else{
                            res.status(200).send({user: userStored})
                        }
                    }
                })
            }else{
                res.status(200).send({message: 'introduce todos los datos'})
                
            }
        })
    } else{
        res.status(200).send({message: 'introduce la contraseña'})
    }

}

function loginUser(req,res){
//metodo para validar que el usuario y contraseña del usuario sean correctas
    const params = req.body;
    const email = params.email;
    const password = params.password;

    User.findOne({email: email.toLowerCase()}, (err,user)=>{
        if (err){
            res.status(500).send({message: 'error en la peticion'})
        }else{
            if(!user){
                res.status(404).send({message: 'el usuario no existe'})
            }
            else{ 
                
    
                
                //comprobar la contraseña
                bcrypt.compare(password, user.password, (err,check)=>{
                    if(check){
                        //devolver los datos del usuario loggeado
                        if (params.gethash){
                            //devolver un token de jwt
                        }else{
                        
                            res.status(200).send({user})
                        }
                    }else {
                        res.status(404).send({message: 'el usuario no ha podido logueado'})
                    }
                })
            }
        }
    })

}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};