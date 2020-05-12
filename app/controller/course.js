const Controller = require('egg').Controller;

class CourseController extends Controller{
  async all(){
    console.log(11)
    try{
      let lesson = await this.ctx.model.Course.findAll().then(res => {
        console.log(res)
        return JSON.parse(JSON.stringify(res, null, 4))
        // projects will be an array of all Project instances
      })
      console.log(lesson,111)
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
    let subtitle = this.ctx.request.body.subtitle;
    let status = this.ctx.request.body.status;
    let description = this.ctx.request.body.description;
    let cover = this.ctx.request.body.cover;
    if(!name || !subtitle || !status || !description || !cover){
      this.ctx.body ={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Course.create({
        name,subtitle,status,description,cover
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
  }
}
module.exports = CourseController