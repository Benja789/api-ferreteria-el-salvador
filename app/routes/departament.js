var db = require('../db/Conection')
const { filterQuery } = require('../services/Queryparams')

// Metodo para obtener todos los departamentos
exports.get = async (req, res) => {
    let where = filterQuery(["id", "nombre", "descripcion", "sucursal_id"], req.query)
    let departament = await db.departamento.findAll({ where: where })
    res.status(200).json(departament)
    return
}

// Metodo para actualizar y crear un departamento
exports.write = async (req, res) => {
    let answer = {
        title: "Not Found",
        message: "La ruta que esta intentando acceder no existe.",
        errors: [],
        status: 404
    }
    if ( !req.body.nombre || !req.body.descripcion || !req.body.sucursal_id ) {
        answer.status = 400
        answer.message = "Inforamcion incompleta o no cumple con los estandares."
        answer.title = "Bad Request"
        if ( !req.body.nombre ) {
            answer.errors.push({
                field: "nombre",
                message: "El campo nombre es obligatorio"
            })
        }
        if ( !req.body.descripcion ) {
            answer.errors.push({
                field: "descripcion",
                message: "El campo descripcion es obligatorio"
            })
        }
        if ( !req.body.sucursal_id ) {
            answer.errors.push({
                field: "sucursal_id",
                message: "El campo sucursal_id es obligatorio"
            })
        }
        res.status(answer.status).json(answer)
        return
    }
    let departament = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        sucursal_id: req.body.sucursal_id
    }

    if ( req.method === "POST" ) {
        let departamentDB = await db.departamento.create(departament)
        if ( !departamentDB ) {
            answer.status = 500
            answer.message = "Error al crear el departamento, intentelo mas tarde."
            res.status(answer.status).json(answer)
            return
        }
        res.status(200).json(departamentDB)
        return
    } 
    if ( req.method === "PUT" ) {
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
        let departamentDB = await db.departamento.update(departament, { where: { id: req.body.id } })
        if ( !departamentDB ) {
            answer.status = 500
            answer.message = "Error al actualizar el departamento, intentelo mas tarde."
            res.status(answer.status).json(answer)
            return
        }
        res.status(200).json(departamentDB)
        return
    }
    answer.status = 422
    answer.message = "El metodo de peticion no es valido"
    answer.title = "Unprocessable Entity"
    res.status(answer.status).json(answer)
    return
}