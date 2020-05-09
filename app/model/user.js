'user strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    phone:{ 
      type:STRING(11),
      allowNull: false,
    },
    code: { 
      type:STRING(4),
      allowNull: false,
    },
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return User;
};


// module.exports = app => {
//   const { INTEGER, STRING } = app.Sequelize;
//   const Movie = app.model.define('Movie', {
//     id: {
//       type: INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: STRING(100),
//       allowNull: false,
//     },
//   }, {
//     freezeTableName: true,
//     tableName: 'z_movie',
//     timestamps: false,
//   });
//   return Movie;
// };

