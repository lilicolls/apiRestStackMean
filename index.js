'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err,res)=>{
    if(err){
        throw err;
    } else{
        console.log("la conexion a la bdd está funcionando perfect!!");
        app.listen(port, function(){
            console.log(`Servidor escuchando en puerto ${port}` );
        });
    }
    
})