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
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombre"
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcion"
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
    }
  };
  const options = {
    tableName: "departamento",
    comment: "",
    indexes: [{
      name: "FK_Departamento_Sucursal",
      unique: false,
      type: "BTREE",
      fields: ["sucursal_id"]
    }]
  };
  const DepartamentoModel = sequelize.define("departamento_model", attributes, options);
  return DepartamentoModel;
};