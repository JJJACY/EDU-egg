const Controller = require('egg').Controller;

class SectionController extends Controller {
  async insert() {
    let chapter_id = this.ctx.request.body.chapter_id;
    let name = this.ctx.request.body.name;
    let sort = this.ctx.request.body.sort;
    let created_at = this.ctx.request.body.created_at;
    if(!chapter_id){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Section.create({
        chapter_id,name,sort,created_at
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
  async single(){
    let id = this.ctx.params.id;
    try{
      let sectiondata = await this.ctx.model.Section.findByPk(id).then( res=>{
        return JSON.parse(JSON.stringify(res, null, 4)) 
      })
      this.ctx.body={
        code: 200,
        data: sectiondata 
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:0,
        message:'服务器错误'
      }
    }
  };
  async update(){
    let id = this.ctx.params.id;
    let video_url = this.ctx.request.body.video_url
    let content = this.ctx.request.body.content;
    let updated_at = this.ctx.request.body.updated_at;
    if( !video_url || !content ){
      this.ctx.body ={
        code: 0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Section.update({
        video_url: video_url,content:content,updated_at:updated_at},{where:{id:id}}
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
  async updatename(){
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name
    let updated_at = this.ctx.request.body.updated_at;
    if( !name  ){
      this.ctx.body ={
        code: 0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Section.update({
        name: name,updated_at:updated_at},{where:{id:id}}
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
      await this.ctx.model.Section.destroy( { where:{id} } )
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
  };
  
}

module.exports = SectionController;