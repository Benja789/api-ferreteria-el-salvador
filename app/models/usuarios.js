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
    clave: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "clave"
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rol_id",
      references: {
        key: "id",
        model: "roles_model"
      }
    },
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "empleado_id",
      unique: "UQ_Usuario_Empleado",
      references: {
        key: "id",
        model: "empleado_model"
      }
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "correo"
    }
  };
  const options = {
    tableName: "usuarios",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "FK_Usuario_Rol",
      unique: false,
      type: "BTREE",
      fields: ["rol_id"]
    }]
  };
  const UsuariosModel = sequelize.define("usuarios_model", attributes, options);
  return UsuariosModel;
};