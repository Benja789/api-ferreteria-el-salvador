const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "fecha"
    },
    tipo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tipo"
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cantidad"
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pedido_id",
      references: {
        key: "id",
        model: "pedido_model"
      }
    },
    inventario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "inventario_id",
      references: {
        key: "id",
        model: "inventario_model"
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "producto_id",
      references: {
        key: "id",
        model: "producto_model"
      }
    }
  };
  const options = {
    tableName: "movimiento",
    comment: "",
    indexes: [{
      name: "FK_Movimiento_Pedido",
      unique: false,
      type: "BTREE",
      fields: ["pedido_id"]
    }, {
      name: "FK_Movimiento_Inventario",
      unique: false,
      type: "BTREE",
      fields: ["inventario_id"]
    }, {
      name: "FK_Movimiento_Producto",
      unique: false,
      type: "BTREE",
      fields: ["producto_id"]
    }]
  };
  const MovimientoModel = sequelize.define("movimiento_model", attributes, options);
  return MovimientoModel;
};