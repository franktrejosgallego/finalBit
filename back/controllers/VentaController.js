var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');

function registrar(req,res){ // Funcion registrar
    let data = req.body;
    var venta = new Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err,venta_save)=>{
        if(venta_save){
            let detalles = data.detalles;
            // Este for each es para cada elemento, es decir recorre la tabla
            detalles.forEach((element,index) => {
                var detalleventa = new DetalleVenta();
                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id;
                // funcion para grabar el detalle d ela vena
                detalleventa.save((err,detalle_save)=>{
                    if(detalle_save){
                        Producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if(producto_data){
                                Producto.findByIdAndUpdate({_id:producto_data._id},{stock: parseInt(producto_data.stock) - parseInt(element.cantidad)},(err,producto_edit)=>{
                                    res.end();
                                })
                            }else{
                                res.send(err);
                            }
                        });
                    }else{
                        res.send(err);
                    }
                });

            });

        }else{
            res.send(err);
        }
    });
}

function datos_venta(req,res){
    var id = req.params['id'];

    Venta.findById(id).populate('idcliente').populate('iduser').exec((err,data_venta)=>{
        if(data_venta){
            DetalleVenta.find({venta:data_venta._id}).populate('idproducto').exec({idventa:id},(err,data_detalle)=>{
                if(data_detalle){
                    res.status(200).send(
                        {
                            data : {
                                venta: data_venta, // Obtiene la data del detalle d eventa 
                                detalles: data_detalle
                            }
                        }
                    );
                }
            });
        }
    });
}

function listado_venta(req,res){ // permite listar las ventas, la funcion recibe un res y un req como respues
    Venta.find().populate('idcliente').populate('iduser').exec((err,data_ventas)=>{
        if(data_ventas){
            res.status(200).send({ventas:data_ventas});
        }else{
            res.status(404).send({message: "No hay ningun registro de venta"});
        }
    });
}

function detalles_venta(req,res){
    var id = req.params['id'];

    // Populate es una función de mongoose para referenciar indices como los inner join
    DetalleVenta.find({venta: id}).populate('idproducto').exec((err,data_detalles)=>{
        // Exec ejecuta bsuquedas de coincidencia en una expresion
        if(data_detalles){
            res.status(200).send({detalles:data_detalles});
        }else{
            res.status(404).send({message: "No se encontró ningun registro en la base de datos"});
        }
    });
}

module.exports = {
    registrar,
    datos_venta,
    listado_venta,
    detalles_venta
}
