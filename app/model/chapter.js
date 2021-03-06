'user strict';

module.exports = app => {
  const { STRING, INTEGER ,DATE} = app.Sequelize;
  const Chapter = app.model.define('chapters',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    course_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    name: { 
      type:STRING(255),
      allowNull: false,
    },
    sort:{
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
  return Chapter;
};