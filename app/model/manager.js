'user strict';

module.exports = app => {
  const { STRING, INTEGER,DATE } = app.Sequelize;
  const Manager = app.model.define('managers',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{
      type:STRING(11),
      allowNull: false,
    },
    phone:{ 
      type:STRING(11),
      allowNull: false,
    },
    role_id: { 
      type:INTEGER,
      allowNull: false,
    },
    created_at:{
      type:DATE,
      allowNull: true,
    },
    updated_at:{
      type:DATE,
      allowNull: true,
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Manager;
};