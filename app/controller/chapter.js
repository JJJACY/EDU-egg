'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async all() {
    try{
      let data = await this.ctx.model.Chapter.findAll({
        order: [['sort','DESC']]
      }).then( res=>{
        console.log(res)
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: data
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
    let course_id = this.ctx.request.body.course_id;
    let name = this.ctx.request.body.name;
    let sort = this.ctx.request.body.sort;
    if(!course_id){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Chapter.create({
        course_id,name,sort
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
  async sort() {
    let params = this.ctx.request.body.params;
    try{
      await params.map(async (data)=>{
      console.log(data.sort)
        this.ctx.model.Chapter.update(
          {sort: data.sort},
          { where:{id:data.id} }).then(res=>{
            console.log(res)
        })
        this.ctx.body={
          code: 200,
          message:'成功了'
        }
    
        console.log(21321)
      })
    }catch(e){
      console.log(e)
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  }
}

module.exports = ChapterController;