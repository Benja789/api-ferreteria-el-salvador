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
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "menu_id",
      references: {
        key: "id",
        model: "menus_model"
      }
    }
  };
  const options = {
    tableName: "permisos",
    comment: "",
    indexes: [{
      name: "FK_Permiso_Rol",
      unique: false,
      type: "BTREE",
      fields: ["rol_id"]
    }, {
      name: "FK_Permiso_Menu",
      unique: false,
      type: "BTREE",
      fields: ["menu_id"]
    }]
  };
  const PermisosModel = sequelize.define("permisos_model", attributes, options);
  return PermisosModel;
};