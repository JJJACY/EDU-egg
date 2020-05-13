const Controller = require('egg').Controller;

class CourseController extends Controller{
  async all(){
    try{
      let lesson = await this.ctx.model.Course.findAll().then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: lesson
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async insert(){
    // let id = this.ctx.request.body.id;
    let name = this.ctx.request.body.name;
    let short_name = this.ctx.request.body.short_name;
    let tips = this.ctx.request.body.tips;
    let description = this.ctx.request.body.description;
    let image_url = this.ctx.request.body.image_url;
    if(!name || !short_name || !tips || !description || !image_url){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Course.create({
        name,short_name,tips,description,image_url,status:0
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
  async delete(){
    console.log(12313123123)
    let id = this.ctx.params.id
    console.log(id)
    try{
      await this.ctx.model.Course.destroy({ where:{id}}).then(res=>{
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
module.exports = CourseController