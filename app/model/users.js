'user strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const Users = app.model.define('users',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(255),
      allowNull: false,
    },
    real_name:{ 
      type:STRING(255),
      allowNull: true,
    },
    unionid:{ 
      type:STRING(255),
      allowNull: true,
    },
    section_key:{ 
      type:STRING(255),
      allowNull: true,
    },
    phone:{ 
      type:STRING(255),
      allowNull: true,
    },
    avatar_url:{ 
      type:TEXT,
      allowNull: false,
    },
    sex:{
      type: INTEGER,
      allowNull: false,
    },
    birthday:{ 
      type:STRING(11),
      allowNull: true,
    },
    introduction:{ 
      type:STRING(11),
      allowNull: true,
    },
    visit_at:{ 
      type:DATE,
      allowNull: true,
    },
    created_at:{
      type:DATE,
      allowNull: true
    },
    updated_at:{
      type:DATE,
      allowNull: true
    }
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Users;
};