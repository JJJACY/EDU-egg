'user strict';

module.exports = app => {
  const { STRING, INTEGER,TEXT,DATE } = app.Sequelize;
  const Company = app.model.define('companies',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name:{ 
      type:STRING(1255),
      allowNull: false,
    },
    short_name: { 
      type:STRING(255),
      allowNull: false,
    },
    slogan: { 
      type:STRING(255),
      allowNull: false,
    },
    code: { 
      type:STRING(30),
      allowNull: false,
    },
    introduction: { 
      type:TEXT,
      allowNull: false,
    },
    contact_name: { 
      type:STRING(30),
      allowNull: false,
    },
    contact_phone: { 
      type:STRING(30),
      allowNull: false,
    },
    image_url: { 
      type:TEXT,
      allowNull: false,
    },
    created_at: { 
      type:DATE,
      allowNull: false,
    },
    updated_at: { 
      type:DATE,
      allowNull: false,
    },
  },{ 
    freezeTableName: true,
    timestamps: false,
  });
  return Company;
};