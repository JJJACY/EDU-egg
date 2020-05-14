'use strict';

const Controller = require('egg').Controller;

class CampanyController extends Controller {
  async all(){
    try{
      let company = await this.ctx.model.Company.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: company
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async insert() {
    let name = this.ctx.request.body.name;
    let short_name = this.ctx.request.body.short_name;
    let slogan = this.ctx.request.body.slogan;
    let code = this.ctx.request.body.code;
    let introduction = this.ctx.request.body.introduction;
    let contact_name = this.ctx.request.body.contact_name;
    let contact_phone = this.ctx.request.body.contact_phone;
    let image_url = this.ctx.request.body.image_url;
    if(!name || !short_name || !slogan || !code || !introduction 
      || !contact_name || !contact_phone || !image_url){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Company.create({
        name,short_name,slogan,code,introduction,contact_name,contact_phone,image_url
      })
      this.ctx.body ={
        code:200,
        message:'创建成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
    
  };
  async single() {
    let id = this.ctx.params.id
    try{
      let companyData = await this.ctx.model.Company.findByPk(id).then( res=>{
         return  JSON.parse(JSON.stringify(res, null, 4))
       })
       this.ctx.body={
         code: 200,
         data: companyData 
       }
     }catch(e){
       console.log(e)
       this.ctx.body ={
         code: 0,
         message: '服务器错误'
       }
     }
  };
  async update(){
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name;
    let short_name = this.ctx.request.body.short_name;
    let slogan = this.ctx.request.body.slogan;
    let code = this.ctx.request.body.code;
    let introduction = this.ctx.request.body.introduction;
    let contact_name = this.ctx.request.body.contact_name;
    let contact_phone = this.ctx.request.body.contact_phone;
    let image_url = this.ctx.request.body.image_url;
    if(!name || !short_name || !slogan || !code || !introduction 
      || !contact_name || !contact_phone || !image_url){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    console.log(id)
    try{
      await this.ctx.model.Company.update({
        name:name,short_name:short_name,slogan:slogan,
        code:code,introduction:introduction,contact_name:contact_name,
        contact_phone:contact_phone,image_url:image_url},{ where:{id} }).then( res=>{
          console.log(res)
        })
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
  };
  async delete(){
    let id = this.ctx.params.id;
    try{
      await this.ctx.model.Company.destroy({ where:{id}}).then(res=>{
        console.log(res,123)
      })
      this.ctx.body ={
        code: 200,
        message: '删除成功!'
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

module.exports = CampanyController;