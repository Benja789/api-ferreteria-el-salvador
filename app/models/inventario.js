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
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sucursal_id",
      references: {
        key: "id",
        model: "sucursal_model"
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
    tableName: "inventario",
    comment: "",
    indexes: [{
      name: "FK_Inventario_Sucursal",
      unique: false,
      type: "BTREE",
      fields: ["sucursal_id"]
    }, {
      name: "FK_Inventario_Producto",
      unique: false,
      type: "BTREE",
      fields: ["producto_id"]
    }]
  };
  const InventarioModel = sequelize.define("inventario_model", attributes, options);
  return InventarioModel;
};