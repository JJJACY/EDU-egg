'user strict';

module.exports = app => {
  const { STRING, INTEGER,TEXT,DATE } = app.Sequelize;
  const Course = app.model.define('courses',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    short_name: { 
      type:STRING(255),
      allowNull: false,
    },
    tips:{
      type:STRING(255),
      allowNull: false,
    },
    description: {
      type:TEXT,
      allowNull: false,
    },
    status:{
      type: INTEGER,
      allowNull: false,
    },
    image_url: {
      type:TEXT,
      allowNull: false,
    }
    ,
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
  return Course;
};