var express = require('express');
var ventaController = require('../controllers/VentaController');

var api = express.Router();

// Api para el CRUD con los métodos post, get, put y delete
api.post('/venta/registrar',ventaController.registrar);
api.get('/venta/:id',ventaController.datos_venta);
api.get('/ventas',ventaController.listado_venta);
api.get('/venta/data/:id',ventaController.detalles_venta);

module.exports = api;