'use strict'
const bcrypt = require ('bcrypt-nodejs') //modulo para encriptar contraseña
const User = require('../models/user')
const jwt = require('../services/jwt')
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
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        }else{
                        
                            res.status(200).send({user})
                        }
                    }else {
                        res.status(404).send({message: 'el usuario no ha podido loguearse'})
                    }
                })
            }
        }
    })

}

function updateUser(req, res){
    //metodo para actualizar un usuario almancenado en la bdd

    const userId = req.params.id;
    const update = req.body;
   
   

    User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
        if (err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if (!userUpdated){
                res.status(404).send({message: 'no se ha podido actualizar el user'})
            }else{
                res.status(200).send({user: userUpdated})
            }
        }

    })

}

function uploadImage(req,res){
    
    const userId = req.params.id;
    const file_name = 'no subido...'
    console.log("entra al metodo")
   // console.log(req)
    if (req.files){
        console.log("you are right")
        const file_path = req.files.image.path;
        const file_split = file_path.split('\/')
        const file_name = file_split[2]
        const ext_split = file_name.split('\.')
        const file_ext = ext_split[1]
       console.log(ext_split)

        //comprobar que el archivo subido sea una imagen
    if(file_ext == 'png'|| file_ext == 'jpg' || file_ext == 'gif'){
        //si la extesion es correcta se actualiza en la bdd

        User.findByIdAndUpdate(userId,{image: file_name}, (err, userUpdated) => {
            if (err){
                res.status(500).send({message: 'error al actualizar la imagen'})
            }else{
                if (!userUpdated){
                    res.status(404).send({message: 'no se ha podido actualizar el usuario'})
                }else {
                    res.status(200).send({user: userUpdated})
                }

            }
            

        })

    }else {
        res.status(401).send({message: 'extension no valida'})
    }

    }else {
        res.status(200).send({message: 'no has subido ninguna imagen...'})
    }

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage
};