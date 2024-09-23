var jwt = require('jsonwebtoken');

exports.validateSession = (req, res, next) => {
    let answer = {
		title: "Not Found",
		message: "La ruta que esta intentando acceder no existe.",
		status: 404
	}
    if ( !req.headers.authorization ) {
        res.status(answer.status).json(answer)
        return
    }
    let header = req.headers.authorization.split(" ")
    if ( header.length !== 2 || header[0] !== "Token" ) {
        answer.status = 401
        answer.message = "Error al identificarse con el servicio, intentelo con un metodo de sesion valido."
        answer.title = "Unauthorized"
        res.status(answer.status).json(answer)
        return
    }

    try {
        let token = jwt.verify(header[1], process.env.SECRET)
        req.user = token
        next()  
    } catch (error) {
        answer.status = 401
        answer.message = "Error al identificarse con el servicio, intentelo con un metodo de sesion valido."
        answer.title = "Unauthorized"
        res.status(answer.status).json(answer)
    }
}

exports.createToken = (user) => {
    console.log(user)
    return jwt.sign(JSON.stringify(user), process.env.SECRET)
}