'user strict';

module.exports = app => {
  const { STRING, INTEGER ,TEXT} = app.Sequelize;
  const Material = app.model.define('material',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(11),
      allowNull: false,
    },
    link: { 
      type:STRING(255),
      allowNull: false,
    },
    target: { 
      type:STRING(255),
      allowNull: false,
    },
    image_url: { 
      type:TEXT,
      allowNull: false,
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Material;
};