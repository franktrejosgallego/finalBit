var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    precioCompra: Number,
    precioVenta: Number,
    stock: Number,
    idCategoria: {type: Schema.ObjectId, ref: 'categoria'},
    puntos: Number,
});

module.exports = mongoose.model('producto', productoSchema);
