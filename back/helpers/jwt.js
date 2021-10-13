var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'diegoarca';

// Esta función exporta crea token , se usa para encriptar la clave del usuario
exports.createToken = function(user){
    var payload =  {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role:user.role,
        iat: moment().unix(), // < Función moment muestra la fecha y la hora actual
        exp: moment().add(30,'days').unix(),
      
    }

    return jwt.encode(payload,secret); // < La función jwt (Json web token)
}