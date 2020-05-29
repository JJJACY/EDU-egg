const Controller = require('egg').Controller;
const authCodeFunc = require('./../utils/authCode.js');

class ManagerController extends Controller {
  async all(){
    try{
      let manager = await this.ctx.model.Manager.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: manager
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
    let id = this.ctx.params.id;
    console.log(1213123123133)
    try{
      let managerData = await this.ctx.model.Manager.findByPk(id).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body={
         code: 200,
         data:managerData
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
    let phone = this.ctx.request.body.phone;
    let created_at = this.ctx.request.body.created_at;
    let role_id = this.ctx.request.body.role_id;
    if(!name || !phone || !role_id ){
      this.ctx.body={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Manager.create({
        name,phone,role_id,created_at
      });
      
      this.ctx.body={
        code: 200,
        message:'新增管理员成功'
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
    let phone = this.ctx.request.body.phone;
    let updated_at = this.ctx.request.body.updated_at;
    let role_id = this.ctx.request.body.role_id;
    if(!name || !phone || !role_id){
      this.ctx.body={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Manager.update({
        name,phone,role_id,updated_at
        },{ where:{id} })
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
      await this.ctx.model.Manager.destory({
        where:{id}
      })
      this.ctx.body ={
        code:200,
        message:'删除管理员成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code: 0,
        message:'服务器错误!'
      }
    }
  }


  async login(){
    const phone = this.ctx.request.body.phone;
    if(!phone){
      return this.ctx.body ={
        code: 0,
        message:'请输入电话!'
      }
    }
    try{
      await this.ctx.model.Manager.findOne({ where:{phone} }).then( res =>{
        if( JSON.parse(JSON.stringify(res, null, 4)) ){
          let auth_Code = phone +'\t'+ JSON.parse(JSON.stringify(res, null, 4)).id;
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
  async authority(){
    let Token = this.ctx.request.body.Token
    let token = authCodeFunc(Token,'DECODE');
    let phone = token.str.split('\t')[0]
    try{
      let  manager = await this.ctx.model.Manager.findAll({
        where:{phone}
      }).then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      let role_id = manager[0].role_id
      let roleperData = await this.ctx.model.Rolepermission.findAll({
        where: {role_id}
      }).then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      // console.log(roleperData)
      this.ctx.body={
        code: 200,
        data: roleperData
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code:0,
        message:'服务器错误！'
      }
    }
  }

}
module.exports = ManagerController;