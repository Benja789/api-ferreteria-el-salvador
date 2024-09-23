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
    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precio_unitario"
    }
  };
  const options = {
    tableName: "detalle_pedido",
    comment: "",
    indexes: [{
      name: "FK_DetallePedido_Pedido",
      unique: false,
      type: "BTREE",
      fields: ["pedido_id"]
    }, {
      name: "FK_DetallePedido_Producto",
      unique: false,
      type: "BTREE",
      fields: ["producto_id"]
    }]
  };
  const DetallePedidoModel = sequelize.define("detalle_pedido_model", attributes, options);
  return DetallePedidoModel;
};