const Controller = require('egg').Controller;
const authCodeFunc = require('./../utils/authCode.js');

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
      await this.ctx.model.Admin.findOne({ where:{phone,password} }).then( res =>{
        if( JSON.parse(JSON.stringify(res, null, 4)) ){
          let auth_Code = phone +'\t'+ password +'\t'+ JSON.parse(JSON.stringify(res, null, 4)).id;
          let token = authCodeFunc(auth_Code,'ENCODE');
          // console.log(token,875)
          // console.log(this.ctx.cookies,77777)
          this.ctx.cookies.set('ac', auth_Code, { maxAge: 24* 60 * 60 * 1000, httpOnly: true });
          this.ctx.body ={
            code: 200,
            message: '登陆成功！',
            token
          }
        }else{
          this.ctx.body ={
            code: 0,
            message: '登陆失败,没有此用户!'
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