var db = require('../db/Conection')
const { filterQuery } = require('../services/Queryparams')


// Metodo para obtener todos los detalles de una orden
exports.get = async (req, res) => {
    let where = filterQuery(["id", "pedido_id", "producto_id", "cantidad", "precio_unitario"], req.query)
    let detailsOrder = await db.detalle_orden.findAll({ where: where })
    res.status(200).json(detailsOrder)
    return
}

// Metodo para actualizar y crear un detalle de una orden
exports.write = async (req, res) => {
    let answer = {
        title: "Not Found",
        message: "La ruta que esta intentando acceder no existe.",
        errors: [],
        status: 404
    }
    if ( !req.body.pedido_id || !req.body.producto_id || !req.body.cantidad || !req.body.precio_unitario ) {
        answer.status = 400
        answer.message = "Inforamcion incompleta o no cumple con los estandares."
        answer.title = "Bad Request"
        if ( !req.body.pedido_id ) {
            answer.errors.push({
                field: "pedido_id",
                message: "El campo pedido_id es obligatorio"
            })
        }
        if ( !req.body.producto_id ) {
            answer.errors.push({
                field: "producto_id",
                message: "El campo producto_id es obligatorio"
            })
        }
        if ( !req.body.cantidad ) {
            answer.errors.push({
                field: "cantidad",
                message: "El campo cantidad es obligatorio"
            })
        }
        if ( !req.body.precio_unitario ) {
            answer.errors.push({
                field: "precio_unitario",
                message: "El campo precio_unitario es obligatorio"
            })
        }
        res.status(answer.status).json(answer)
        return
    }
    let detailsOrder = {
        pedido_id: req.body.pedido_id,
        producto_id: req.body.producto_id,
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario
    }

    if ( req.method === "POST" ) {
        let detailsOrderDB = await db.detalle_orden.create(detailsOrder)
        if ( !detailsOrderDB ) {
            answer.status = 500
            answer.message = "Error al crear el detalle de la orden, intentelo mas tarde."
            res.status(answer.status).json(answer)
            return
        }
        res.status(200).json(detailsOrderDB)
        return
    }
    if ( req.method === "PUT" ) {
        if ( !req.body.id ) {
            answer.status = 400
            answer.message = "El campo id es obligatorio"
            answer.title = "Bad Request"
            answer.errors.push({
                field: "id",
                message: "El campo id es obligatorio"
            })
            res.status(answer.status).json(answer)
            return
        }
        let where = filterQuery(["id"], req.query)
        let detailsOrderDB = await db.detalle_orden.update(detailsOrder, { where: where })
        if ( !detailsOrderDB ) {
            answer.status = 500
            answer.message = "Error al actualizar el detalle de la orden, intentelo mas tarde."
            res.status(answer.status).json(answer)
            return
        }
    }
    
    answer.status = 422
    answer.message = "El metodo de peticion no es valido"
    answer.title = "Unprocessable Entity"
    res.status(answer.status).json(answer)
    return
}
