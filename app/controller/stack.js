const Controller = require('egg').Controller;

class StackController extends Controller {
  async all(){
    try{
      let stackdata = await this.ctx.model.Stacks.findAll().then(res=>{
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: stackdata
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
    let tag_line = this.ctx.request.body.tag_line;
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
      await this.ctx.model.Stacks.create({
        name,tag_line,description,image_url,created_at,slug:0
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
      let stackData = await this.ctx.model.Stacks.findByPk(id).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body={
        code: 200,
        data: stackData 
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

module.exports = StackController;