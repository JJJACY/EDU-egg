const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async all() {
    try{
      let project = await this.ctx.model.Project.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: project
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
    if(!name || !description || !image_url || !created_at){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Project.create({
        name,description,image_url,created_at,status:0
      })
      this.ctx.body={
        code: 200,
        message:'新增成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async delete(){
    let id = this.ctx.params.id;
    try{
      await this.ctx.model.Zhiyecourse.destroy( { where:{id} } )
      this.ctx.body ={
        code: 200,
        message: '删除成功！'
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

module.exports = ProjectController;