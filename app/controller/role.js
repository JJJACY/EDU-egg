const Controller = require('egg').Controller;

class RoleController extends Controller {
  async all(){
    try{
      let role = await this.ctx.model.Role.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: role
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  }
  async single(){
    let id = this.ctx.params.id
    try{
      let roleData = await this.ctx.model.Role.findByPk(id).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      let role_id = roleData.id;
      let role_permission = await this.ctx.model.Rolepermission.findAll({
        where:{role_id}
      }).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body={
         code: 200,
         data:{
          roleData,
          role_permission
         }
      }
    }catch(e){
      console.log(e)
        this.ctx.body ={
          code: 0,
          message: '服务器错误'
        }
      }
  }
  async insert(){
    let name = this.ctx.request.body.name;
    let description = this.ctx.request.body.description;
    let created_at = this.ctx.request.body.created_at;
    let permission_slug = this.ctx.request.body.permission_slug.toString();
    if(!name || !description ){
      this.ctx.body={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      let Roles = await this.ctx.model.Role.create({
        name,description,created_at
      });
      let role_id = Roles.dataValues.id;
      console.log(permission_slug,role_id)
      await this.ctx.model.Rolepermission.create({
        role_id, permission_slug
      })
      this.ctx.body={
        code: 200,
        message:'新增角色成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  }
  async update(){
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name;
    let description = this.ctx.request.body.description;
    let updated_at = this.ctx.request.body.updated_at;
    let permission_slug = this.ctx.request.body.permission_slug.toString();
    if(!name || !description){
      this.ctx.body={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      let Roles = await this.ctx.model.Role.update({
        name,description,updated_at
        },{ where:{id:id} })
      let role_id = Roles[0];
      await this.ctx.model.Rolepermission.update({
        permission_slug},
      {where:{role_id}})
      this.ctx.body={
        code: 200,
        message:'修改成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code: 0,
        message:'服务器错误!'
      }
    }
  }
  async delete(){
    let id = this.ctx.params.id;
    try{
      let Roles = await this.ctx.model.Role.destory({
        where:{id}
      })
      let role_id = Roles[0]
      await this.ctx.model.Rolepermission.destory({
        where:{role_id}
      })
      this.ctx.body ={
        code:200,
        message:'删除角色成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code: 0,
        message:'服务器错误!'
      }
    }
  }
}
module.exports = RoleController;