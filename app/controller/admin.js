const Controller = require('egg').Controller;

class AdminController extends Controller{
  async login(){
    const phone = this.ctx.request.body.phone;
    const password = this.ctx.request.body.password;  
    if(!phone || !password){
      return this.ctx.body ={
        code: 0,
        message:'请输入账号密码!'
      }
    }
    try{
      await this.ctx.model.Admin.findOne({ where:{phone} }).then( res =>{
        console.log(res,5555)
        if(res === null){
          this.ctx.body ={
            code: 0,
            message: '账号密码错误！'
          }
        }
        // console.log( JSON.parse(JSON.stringify(res, null, 4)).phone, 111)
        if( phone == JSON.parse(JSON.stringify(res, null, 4)).phone ){
          this.ctx.body ={
            code: 200,
            message: '登陆成功！'
          }
        }
      })
    }catch(e){
      console.log(e)
      this.ctx.body = {
        code: 0,
        message:'服务器错误'
      }
    }
  }

}
module.exports = AdminController;