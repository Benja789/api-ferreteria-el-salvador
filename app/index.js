var router = require("express").Router()

router.post('/auth', require("./routes/auth").post)

// Parte de proveedores
router.get('/supplier', require("./routes/supplier").get)
router.post('/supplier', require("./routes/supplier").write)
router.put('/supplier', require("./routes/supplier").write)

// Parte de productos
router.get('/product', require("./routes/product").get)
router.post('/product', require("./routes/product").write)
router.put('/product', require("./routes/product").write)

// Parte de departamentos
router.get('/departament', require("./routes/departament").get)
router.post('/departament', require("./routes/departament").write)
router.put('/departament', require("./routes/departament").write)



module.exports = router