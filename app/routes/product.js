var db = require('../db/Conection')
const { filterQuery } = require('../services/Queryparams')

// Metodo para obtener todos los producto
exports.get = async (req, res) => {
    let where = filterQuery(["id", "nombre", "descripcion", "precio"], req.query)
    let products = await db.producto.findAll({ where: where })
    res.status(200).json(products)
    return
}


// Metodo para actualizar y crear un producto
exports.write = async (req, res) => {
    let answer = {
        title: "Not Found",
        message: "La ruta que esta intentando acceder no existe.",
        errors: [],
        status: 404
    }
    if ( !req.body.nombre || !req.body.descripcion || !req.body.precio ) {
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
        if ( !req.body.precio ) {
            answer.errors.push({
                field: "precio",
                message: "El campo precio es obligatorio"
            })
        }
        res.status(answer.status).json(answer)
        return
    }
    let product = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio
    }

    if ( req.method === "POST" ) {
        let productDB = await db.producto.create(product)
        if ( !productDB ) {
            answer.status = 500
            answer.message = "Error al crear el producto, intentelo mas tarde."
            res.status(answer.status).json(answer)
            return
        }
        res.status(200).json(productDB)
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
        let productDB = await db.producto.findOne({where: {id: req.body.id}})
        if ( !productDB ) {
            answer.status = 404
            answer.message = "El producto que intenta actualizar no existe."
            res.status(answer.status).json(answer)
            return
        }
        await productDB.update(product)
        res.status(200).json(productDB)
        return
    }
    answer.status = 422
    answer.message = "El metodo de peticion no es valido"
    answer.title = "Unprocessable Entity"
    res.status(answer.status).json(answer)
    return
}