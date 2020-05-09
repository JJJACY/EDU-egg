const Service = require('egg').Service;

class UserService extends Service {
  async fundall(){
    const all = await this.ctx.db;
    console.log(this.ctx.db,222)
    return all;
  };
  //新增验证码
  async insert() { 
    const  code = await this.ctx.db.insert('user', code);
    return code;
  };
  //校验比对验证码
  async find(code) { 
    const  code = await this.ctx.db.query('select * from user where code = ?', code);
    if(!code.affectedRows){ // 判断插入成功
      this.ctx.body ={
        code: 0,
        message:'验证码错误，请重新输入验证码'
      }
    }
    return ;
  }
}

module.exports =UserService;