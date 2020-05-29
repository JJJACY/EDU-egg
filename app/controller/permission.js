const Controller = require('egg').Controller;

class PermissionController extends Controller {
  async all(){
    try{
      let permission = await this.ctx.model.Permission.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: permission
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
module.exports = PermissionController;