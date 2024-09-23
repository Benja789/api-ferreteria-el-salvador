var db = require('../db/Conection');
const { filterQuery } = require('../services/Queryparams');

// Metodo para obtener todos los proveedores
exports.get = async (req, res) => {
    let params = ["id", "nombre", "nombreContacto", "telefonoContacto", "direccion"];
    let where = filterQuery(params, req.query)
    let suppliers = await db.proveedor.findAll({ where: where })
    res.status(200).json(suppliers)
    return
}

// Metodo para crear un proveedor y actualizarlo
exports.write = async (req, res) => {
    let answer = {
        title: "Not Found",
        message: "La ruta que esta intentando acceder no existe.",
        errors: [],
        status: 404
    }
    if ( !req.body.nombre || !req.body.direccion || !req.body.nombreContacto || !req.body.telefonoContacto ) {
        answer.status = 400
        answer.message = "Inforamcion incompleta o no cumple con los estandares."
        answer.title = "Bad Request"
        if ( !req.body.nombre ) {
            answer.errors.push({
                field: "nombre",
                message: "El campo nombre es obligatorio"
            })
        }
        if ( !req.body.direccion ) {
            answer.errors.push({
                field: "direccion",
                message: "El campo direccion es obligatorio"
            })
        }
        if ( !req.body.nombreContacto ) {
            answer.errors.push({
                field: "nombreContacto",
                message: "El campo nombre de contacto es obligatorio"
            })
        }
        if ( !req.body.telefonoContacto ) {
            answer.errors.push({
                field: "telefonoContacto",
                message: "El campo telefono de contacto es obligatorio"
            })
        }
        res.status(answer.status).json(answer)
        return
    }
    let supplier = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        nombreContacto: req.body.nombreContacto,
        telefonoContacto: req.body.telefonoContacto
    }

    if ( req.method === "POST" ) {
        let supplierDB = await db.proveedor.create(supplier)
        if ( !supplierDB ) {
            answer.status = 400
            answer.message = "No se logro crear el elemento, intentelo mas tarde o pongase en contacto con soporte tecnico."
            answer.title = "Unauthorized"
            res.status(answer.status).json(answer)
            return
        }
        res.status(201).json(supplierDB)
        return

    } else if ( req.method === "PUT" ) {
        if ( !req.body.id ) {
            answer.status = 400
            answer.message = "Inforamcion incompleta o no cumple con los estandares."
            answer.title = "Bad Request"
            answer.errors.push({
                field: "id",
                message: "El campo id es obligatorio"
            })
            res.status(answer.status).json(answer)
            return
        }
        
        let supplierDB = await db.proveedor.update(supplier, {where: {id: req.body.id}})
        if ( !supplierDB ) {
            answer.status = 400
            answer.message = "Error al actualizar el elemento."
            answer.title = "Bad Request"
            res.status(answer.status).json(answer)
            return
        }
        res.status(200).json(supplierDB)
        return
    } else {
        answer.status = 422
        answer.message = "El metodo de peticion no es valido"
        answer.title = "Unprocessable Entity"
        res.status(answer.status).json(answer)
        return
    }
}