'user strict';

module.exports = app => {
  const { STRING, INTEGER} = app.Sequelize;
  const Permission = app.model.define('permissions',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    slug:{ 
      type:STRING(255),
      allowNull: false,
    },
    group_id:{ 
      type:INTEGER,
      allowNull: false,
    },
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Permission;
};