'user strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const Section = app.model.define('sections',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    chapter_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    name: { 
      type:STRING(255),
      allowNull: false,
    },
    content: {
      type:TEXT,
      allowNull: true,
    },
    video_url: {
      type:TEXT,
      allowNull: true,
    },
    sort: {
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
  return Section;
};