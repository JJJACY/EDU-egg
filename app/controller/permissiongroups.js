const Controller = require('egg').Controller;

class PergroupsController extends Controller {
  async all(){
    try{
      let pergroups = await this.ctx.model.Permissiongroup.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      await Promise.all(pergroups.map( async data=>{
        data.permission = await this.ctx.model.Permission.findAll({
          where:{group_id: data.id}
        })
      }) )
      this.ctx.body ={
        code: 200,
        data: pergroups
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
module.exports = PergroupsController;