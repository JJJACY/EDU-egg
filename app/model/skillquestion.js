'user strict';

module.exports = app => {
  const { INTEGER, DATE, TEXT} = app.Sequelize;
  const Skillquestion = app.model.define('skill_questions',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    stem:{ 
      type:TEXT,
      allowNull: false,
    },
    stack_id: { 
      type:INTEGER,
      allowNull: false,
    },
    level: {
      type:INTEGER,
      allowNull: false,
    },
    option: {
      type:TEXT,
      allowNull: false,
    },
    currect: {
      type:TEXT,
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
  return Skillquestion;
};