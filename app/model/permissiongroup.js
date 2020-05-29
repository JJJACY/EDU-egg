'user strict';

module.exports = app => {
  const { STRING, INTEGER} = app.Sequelize;
  const Permissiongroup = app.model.define('permission_groups',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Permissiongroup;
};