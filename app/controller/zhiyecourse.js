const Controller = require('egg').Controller;

class zhiyeCourseController extends Controller {
  async insert() {
    let zhiye_id = this.ctx.request.body.zhiye_id;
    let path_id = this.ctx.request.body.path_id;
    let course_id = this.ctx.request.body.course_id;
    let sort = this.ctx.request.body.sort;

    if(!zhiye_id && !path_id && !course_id){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Zhiyecourse.create({
        zhiye_id, path_id,course_id,sort
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

module.exports = zhiyeCourseController;