'user strict';

module.exports = app => {
  const { STRING, INTEGER, DATE} = app.Sequelize;
  const Version = app.model.define('versions',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    project_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
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
  return Version;
};