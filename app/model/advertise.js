'user strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Advertise = app.model.define('advertises',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(11),
      allowNull: false,
    },
    slug: { 
      type:STRING(255),
      allowNull: false,
    },
    width: { 
      type:INTEGER,
      allowNull: false,
    },
    height: { 
      type:INTEGER,
      allowNull: false,
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Advertise;
};