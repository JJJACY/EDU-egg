'user strict';

module.exports = app => {
  const {  INTEGER, DATE } = app.Sequelize;
  const Zhiyecourse = app.model.define('zhiye-courses',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    zhiye_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    path_id:{ 
      type:INTEGER,
      allowNull: false,
    },
    course_id:{ 
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
  return Zhiyecourse;
};