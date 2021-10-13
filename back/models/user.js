var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('user', userSchema);
