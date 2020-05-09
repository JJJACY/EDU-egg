const Controller = require('egg').Controller;
const service = require('./../service/auth.js');

class AuthController extends Controller{
  async send() {
    const phone = this.ctx.request.body.phone;
    try{
      const Servicess = await this.ctx.model.User.findOne()
      .then(res => {
      return JSON.parse(JSON.stringify(res, null, 4))
    });
    console.log(Servicess)
    console.log( typeof(Servicess),123131312)
    this.ctx.body ={
      code: 200,
      data: Servicess[0].code
    }

    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  }
}
module.exports = AuthController;