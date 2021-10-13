// CRUD para categorías
var Categoria = require('../models/categoria')

function registrar(req,res){
    var data = req.body;

    var categoria = new Categoria()
    categoria.titulo = data.titulo
    categoria.descripcion = data.descripcion

    categoria.save((err,categoria_save)=>{
        if(err){ // Valida si encuentra la conexion con mongo
            res.status(500).send({message: 'Error en conexión con el servidor'})
        }else{
            if(categoria_save){
                res.status(200).send({categoria: categoria_save}) // < Devuelve el status de la conexión
            }else{
                res.status(403).send({message: 'No se actualizo ningún registro'}) // < Devuelve si no encuentra registros
            }
        }
    })
}
// Validación de la conexión, con MONGODB para obtener categorías 
function obtener_categoria(req,res){
    var id = req.params['id'];
    // Esta función encuentra por el Id
    Categoria.findById({_id: id}, (err,categoria_data) =>{
        if(err){
            res.status(500).send({message: 'Error en conexión con el servidor'})
        }else{
            if(categoria_data){
                res.status(200).send({categoria: categoria_data})
            }else{
                res.status(403).send({message: 'No existe el registro'})
            }
        }
    })
}
// Función para editar registros en Mongo
function editar(req,res){
    var id = req.params['id']
    var data = req.body;

    Categoria.findByIdAndUpdate({_id:id},{titulo: data.titulo, descripcion : data.descripcion},(err,categoria_edit)=>{
        if(err){
            res.status(500).send({message: 'Error en conexión con el servidor'})
        }else{
           if(categoria_edit){
            res.status(200).send({categoria: categoria_edit});
           }else{
            res.status(403).send({message: 'No se actualizo ningún registro'})
           }
        }
    });
}
// Función para eliminar registro
function eliminar(req,res)
{
    var id = req.params['id']

    Categoria.findByIdAndRemove({_id:id},(err,categoria_delete)=>{
        if(err){
            res.status(500).send({message: 'Error en conexión con el servidor'})
        }else{
            if(categoria_delete){
                res.status(200).send({categoria: categoria_delete})
            }else{
                res.status(403).send({message: 'No se pudo eliminar ningún registro'})
            }
        }
    });
}
// Función para listar registro de categoría
function listar(req,res){
    var nombre = req.params['nombre'];

    Categoria.find({titulo: new RegExp(nombre,'i')}, (err,categoria_listado)=>{
        if(err){
            res.status(500).send({message: err});
        }else{
            if(categoria_listado){
                res.status(200).send({categorias: categoria_listado})
            }else{
                res.status(403).send({message: 'No se encontraron registros'})
            }
        }
    });

}

module.exports = { // < Export module
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar
}