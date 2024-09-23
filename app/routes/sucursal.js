var db = require('../db/Conection')
const { filterQuery } = require('../services/Queryparams')


// Metodo para obtener todas las sucursales
exports.get = async (req, res) => {
    let where = filterQuery(["id", "nombre", "direccion", "telefono"], req.query)
    let sucursales = await db.sucursal.findAll({ where: where })
    res.status(200).json(sucursales)
    return
}