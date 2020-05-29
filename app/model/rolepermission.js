'user strict';

module.exports = app => {
  const { STRING, INTEGER} = app.Sequelize;
  const Rolepermission = app.model.define('role_permissions',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    role_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    permission_slug:{
      type: STRING(255),
      allowNull: false,
    },
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Rolepermission;
};