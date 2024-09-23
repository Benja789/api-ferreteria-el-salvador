var router = require("express").Router()
var cors = require('cors');

let corsOptions = {
    origin: "*",
    credentials: false,
    preflightContinue: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

router.post('/auth', cors(corsOptions), require("./routes/auth").post)

// Parte de proveedores
router.get('/supplier', cors(corsOptions), require("./routes/supplier").get)
router.post('/supplier', cors(corsOptions), require("./routes/supplier").write)
router.put('/supplier', cors(corsOptions), require("./routes/supplier").write)

// Parte de productos
router.get('/product', cors(corsOptions), require("./routes/product").get)
router.post('/product', cors(corsOptions), require("./routes/product").write)
router.put('/product', cors(corsOptions), require("./routes/product").write)

// Parte de departamentos
router.get('/departament', cors(corsOptions), require("./routes/departament").get)
router.post('/departament', cors(corsOptions), require("./routes/departament").write)
router.put('/departament', cors(corsOptions), require("./routes/departament").write)



module.exports = router