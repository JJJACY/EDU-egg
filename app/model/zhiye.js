'user strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT} = app.Sequelize;
  const Zhiye = app.model.define('zhiye',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    sort: { 
      type:INTEGER,
      allowNull: false,
    },
    image_url: {
      type:TEXT,
      allowNull: false,
    },
    description: {
      type:TEXT,
      allowNull: false,
    },
    status: {
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
  return Zhiye;
};