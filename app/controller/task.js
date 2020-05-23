const Controller = require('egg').Controller;

class TaskController extends Controller {
  async insert() {
    let name = this.ctx.request.body.name;
    let project_id = this.ctx.request.body.project_id;
    let version_id = this.ctx.request.body.version_id;
    let story_id = this.ctx.request.body.story_id;
    let sort = this.ctx.request.body.sort;
    let created_at = this.ctx.request.body.created_at;
    if(!name || !project_id || !version_id ||  !story_id || !sort){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Task.create({
        project_id,version_id,story_id,name,sort,created_at
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
      let taskdata = await this.ctx.model.Task.findByPk(id).then( res=>{
        return JSON.parse(JSON.stringify(res, null, 4)) 
      })
      this.ctx.body={
        code: 200,
        data: taskdata 
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:0,
        message:'服务器错误'
      }
    }
  }
  async update(){
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name;
    let level = this.ctx.request.body.level;
    let platform = this.ctx.request.body.platform;
    let content = this.ctx.request.body.content;
    let updated_at = this.ctx.request.body.updated_at;
    if(!name || !level || !platform || !content ){
      this.ctx.body ={
        code: 0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Task.update({
        name: name,level:level,platform:platform,content:content,updated_at:updated_at},{where:{id:id}}
      ).then(res=>{
        console.log(res)
      })
      this.ctx.body ={
        code: 200,
        message:'修改成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:0,
        message:'服务器错误'
      }
    }
  };
  async delete(){
    let id = this.ctx.params.id;
    try{
      await this.ctx.model.Task.destroy( { where:{id} } ).then(res=>{
        console.log(res)
      })
      this.ctx.body ={
        code: 200,
        message: '删除成功!'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:0,
        message:'服务器错误'
      }
    }
  }
}

module.exports = TaskController;