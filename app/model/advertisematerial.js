'user strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const Advertisematerial = app.model.define('advertise_materials',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    advertises_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    material_id: { 
      type:INTEGER,
      allowNull: false,
    },
    sort: { 
      type:INTEGER,
      allowNull: false,
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Advertisematerial;
};