'user strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Admin = app.model.define('admin',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    phone:{ 
      type:STRING(11),
      allowNull: false,
    },
    password: { 
      type:STRING(255),
      allowNull: false,
    },
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Admin;
};