var db = require('../db/Conection')
var { createToken } = require('../middleware/Auth')
exports.post = async (req, res) => {
    let answer = {
        title: "Not Found",
        message: "La ruta que esta intentando acceder no existe.",
        status: 404
    }
    if ( !req.body.email || !req.body.password ) {
        answer.status = 400
        answer.message = "Error al identificarse con el servicio, intentelo con un metodo de sesion valido."
        answer.title = "Unauthorized"
        res.status(answer.status).json(answer)
        return
    }
    let user = {
        email: req.body.email,
        password: req.body.password
    }

    let userDB = await db.usuario.findOne({where: {correo: user.email, clave: user.password}})
    if ( !userDB ) {
        answer.status = 401
        answer.message = "Error al identificarse con el servicio, intentelo con un metodo de sesion valido."
        answer.title = "Unauthorized"
        res.status(answer.status).json(answer)
        return
    }
    let token = createToken(userDB)
    res.status(200).json({token: token, user: userDB})
    return
}