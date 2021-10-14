var express = require('express');
var categoriaController = require('../controllers/CategoriaController');

var api = express.Router();

// Api para el CRUD con los métodos post, get, put y delete
api.post('/categoria/registrar',categoriaController.registrar);
api.get('/categoria/:id',categoriaController.obtener_categoria); // < Llamadas a los controller
api.put('/categoria/editar/:id',categoriaController.editar);
api.delete('/categoria/eliminar/:id',categoriaController.eliminar);
api.get('/categorias/:nombre?',categoriaController.listar);

module.exports = api;