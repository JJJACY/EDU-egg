const Controller = require('egg').Controller;

class ZhiyeController extends Controller {
  async all(){
    try{
      let zhiyedata = await this.ctx.model.Zhiye.findAll().then(res=>{
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: zhiyedata
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
    let description = this.ctx.request.body.description;
    let image_url = this.ctx.request.body.image_url;
    let created_at = this.ctx.request.body.created_at;
    if(!name || !description || !image_url){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Zhiye.create({
        name,description,image_url,created_at,status:0,sort:1
      })
      this.ctx.body={
        code: 200,
        message: '新增成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  
  };
  async single(){
    let id = this.ctx.params.id;
    try{
      let zhiyeData = await this.ctx.model.Zhiye.findByPk(id).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body={
        code: 200,
        data: zhiyeData 
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async sort() {
    
  }
}

module.exports = ZhiyeController;