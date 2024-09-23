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
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precio"
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
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "proveedor_id",
      references: {
        key: "id",
        model: "proveedor_model"
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usuario_id",
      references: {
        key: "id",
        model: "usuarios_model"
      }
    }
  };
  const options = {
    tableName: "pedido",
    comment: "",
    indexes: [{
      name: "FK_Pedido_Proveedor",
      unique: false,
      type: "BTREE",
      fields: ["proveedor_id"]
    }, {
      name: "FK_Pedido_Usuario",
      unique: false,
      type: "BTREE",
      fields: ["usuario_id"]
    }]
  };
  const PedidoModel = sequelize.define("pedido_model", attributes, options);
  return PedidoModel;
};