'user strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT} = app.Sequelize;
  const Zhiyepath = app.model.define('zhiye-path',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    zhiye_id:{ 
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
    description: {
      type:TEXT,
      allowNull: true,
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
  return Zhiyepath;
};