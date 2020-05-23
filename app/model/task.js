'user strict';

module.exports = app => {
  const { STRING, INTEGER,TEXT, DATE} = app.Sequelize;
  const Task = app.model.define('tasks',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    story_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    version_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    project_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    content:{ 
      type:TEXT,
      allowNull: true,
    },
    status: { 
      type:INTEGER,
      allowNull: true,
    },
    level: { 
      type:INTEGER,
      allowNull: true,
    },
    platform: { 
      type:INTEGER,
      allowNull: true,
    },
    created_at:{
      type:DATE,
      allowNull: true,
    },
    sort: { 
      type:INTEGER,
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
  return Task;
};