'use strict';

const Controller = require('egg').Controller;

class AdvertiseController extends Controller {
  async all(){
    try{
      let advertise = await this.ctx.model.Advertise.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: advertise
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
    let slug = this.ctx.request.body.slug;
    let width = this.ctx.request.body.width;
    let height = this.ctx.request.body.height;
    if(!name || !slug || !width || !height ){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Advertise.create({name,slug,width,height})
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
      let advertiseData = await this.ctx.model.Advertise.findByPk(id).then( res=>{
         return  JSON.parse(JSON.stringify(res, null, 4))
       })
       this.ctx.body={
         code: 200,
         data: advertiseData 
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
    let slug = this.ctx.request.body.slug;
    let width = this.ctx.request.body.width;
    let height = this.ctx.request.body.height;
    if(!name || !slug || !width || !height ){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Advertise.update({
        name:name,slug:slug,width:width,
        height:height},{ where:{id} }).then( res=>{
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
      await this.ctx.model.Advertise.destroy({ where:{id}}).then(res=>{
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
  };
}

module.exports = AdvertiseController;