'user strict';

module.exports = app => {
  const { STRING, INTEGER ,DATE} = app.Sequelize;
  const Smslog = app.model.define('sms_logs',{
    id: { 
      type: INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    template:{ 
      type:INTEGER,
      allowNull: true,
    },
    content: { 
      type:STRING(255),
      allowNull: true,
    },
    phone: { 
      type:STRING(255),
      allowNull: true,
    },
    code: { 
      type:STRING(255),
      allowNull: false,
    },
    status:{ 
      type:INTEGER,
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
  return Smslog;
};