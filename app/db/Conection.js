var Sequelize = require("sequelize")

var sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER,  process.env.DB_PASS, {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pool: {
            max: 5, 
            min: 0, 
            acquire: 30000,
            idle: 10000
        },
        logging: true
})

const db = {
    connection: sequelize,
    Sequelize: Sequelize,
    departamento: require("../models/departamento")(sequelize, Sequelize),
    detallePedido: require("../models/detalle_pedido")(sequelize, Sequelize),
    empleado: require("../models/empleado")(sequelize, Sequelize),
    inventario: require("../models/inventario")(sequelize, Sequelize),
    menus: require("../models/menus")(sequelize, Sequelize),
    movimiento: require("../models/movimiento")(sequelize, Sequelize),
    pedido: require("../models/pedido")(sequelize, Sequelize),
    permisos: require("../models/permisos")(sequelize, Sequelize),
    producto: require("../models/producto")(sequelize, Sequelize),
    proveedor: require("../models/proveedor")(sequelize, Sequelize),
    roles: require("../models/roles")(sequelize, Sequelize),
    sucursal: require("../models/sucursal")(sequelize, Sequelize),
    usuario: require("../models/usuarios")(sequelize, Sequelize),
}

module.exports = db