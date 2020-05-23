'user strict';

module.exports = app => {
  const { STRING, INTEGER,TEXT, DATE} = app.Sequelize;
  const Story = app.model.define('stories',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    version_id:{ 
      type: INTEGER(11),
      allowNull: false,
    },
    project_id:{ 
      type: INTEGER(11),
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
    sort: { 
      type: INTEGER,
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
  return Story;
};