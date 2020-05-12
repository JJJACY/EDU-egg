'user strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Course = app.model.define('course',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    subtitle: { 
      type:STRING(255),
      allowNull: false,
    },
    status:{
      type: INTEGER,
      allowNull: false,
    },
    description: {
      type:STRING(255),
      allowNull: false,
    },
    cover: {
      type:STRING(255),
      allowNull: false,
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Course;
};