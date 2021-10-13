var express = require('express'); // Un require a express, body-parser y al mongoose
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT ||  4201; // Sobre el puerto 4201

//ROUTES
var user_routes = require('./routes/user'); // < - Ruteado para user
var categoria_routes = require('./routes/categoria'); // < - Ruteado para categoria
var producto_routes = require('./routes/producto'); // < - Ruteado para productos
var cliente_routes = require('./routes/cliente');  // < - Ruteado para cliente
var venta_routes = require('./routes/venta');    // < - Ruteado para venta

var app = express();
// Conexion con mongoose
mongoose.connect('mongodb://localhost:27017/sistema',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Corriendo servidor");
        app.listen(port, function(){
            console.log("Servidor conectado en " + port); // Identifica en q puerto esta conectado
        });
        
    }
});
// En el ejemplo usaba estos métodos, estan obsoletos
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// Autenticación del usuario
app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});
// Apuntamiento del Api
app.use('/api',user_routes);
app.use('/api',categoria_routes);
app.use('/api',producto_routes);
app.use('/api',cliente_routes);
app.use('/api',venta_routes);

module.exports = app;
