'use strict';

const Controller = require('egg').Controller;

class MaterialController extends Controller {
  async all(){
    try{
      let material = await this.ctx.model.Material.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: material
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
    let link = this.ctx.request.body.link;
    let target = this.ctx.request.body.target;
    let image_url = this.ctx.request.body.image_url;
    if(!name || !link || !target || !image_url ){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Material.create({name,link,target,image_url})
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
      let MaterialData = await this.ctx.model.Material.findByPk(id).then( res=>{
         return  JSON.parse(JSON.stringify(res, null, 4))
       })
       this.ctx.body={
         code: 200,
         data: MaterialData 
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
    let link = this.ctx.request.body.link;
    let target = this.ctx.request.body.target;
    let image_url = this.ctx.request.body.image_url;
    if(!name || !link || !target || !image_url ){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Material.update({
        name:name,link:link,target:target,
        image_url:image_url},{ where:{id} }).then( res=>{
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
      await this.ctx.model.Material.destroy({ where:{id}}).then(res=>{
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

module.exports = MaterialController;