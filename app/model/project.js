'user strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT} = app.Sequelize;
  const Project = app.model.define('projects',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    description:{ 
      type:TEXT,
      allowNull: false,
    },
    content:{ 
      type:TEXT,
      allowNull: true,
    },
    status: { 
      type:INTEGER,
      allowNull: false,
    },
    image_url: {
      type:TEXT,
      allowNull: false,
    },
    created_at:{
      type:DATE,
      allowNull: false,
    },
    updated_at:{
      type:DATE,
      allowNull: true,
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Project;
};