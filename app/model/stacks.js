'user strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT} = app.Sequelize;
  const Stacks = app.model.define('stacks',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    slug: { 
      type:STRING(255),
      allowNull: false,
    },
    image_url: {
      type:TEXT,
      allowNull: false,
    },
    // tag_line: {
    //   type:TEXT,
    //   allowNull: false,
    // },
    description: {
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
  return Stacks;
};