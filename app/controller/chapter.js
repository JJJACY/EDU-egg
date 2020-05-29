'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async sort(){
    let params = this.ctx.request.body.params;
    try{
      Promise.all(params.map(async (data,index)=>{
        await this.ctx.model.Chapter.update(
          {sort: index},
          { where:{id: data.id} })
          Promise.all(data.sectionAll.map( async( arr,idx)=>{
          await this.ctx.model.Section.update(
            {sort: idx,chapter_id:data.id},
            { where: {id: arr.id} })
        }))
      }))
      this.ctx.body={
        code: 200,
        message:'成功了'
      }
    }catch(e){
      console.log(1123,e)
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  };
  async insert() {
    let course_id = this.ctx.request.body.course_id;
    let name = this.ctx.request.body.name;
    let sort = this.ctx.request.body.sort;
    let created_at = this.ctx.request.body.created_at;
    if(!course_id){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Chapter.create({
        course_id,name,sort,created_at
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
  async update() {
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name;
    if(!name){
      this.ctx.body ={
        code: 0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Chapter.update({
        name: name},{where:{id:id}}
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
  async delete() {
    let id = this.ctx.params.id;
    try{
      await this.ctx.model.Chapter.destroy( { where:{id} } ).then(res=>{
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
  };
}

module.exports = ChapterController;