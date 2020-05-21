const Controller = require('egg').Controller;

class SectionController extends Controller {
  // async all() {
  //   try{
  //     let data = await this.ctx.model.Section.findAll({
  //       order: [['sort','DESC']]
  //     }).then( res=>{
  //       console.log(res)
  //       return JSON.parse(JSON.stringify(res, null, 4))
  //     })
  //     this.ctx.body ={
  //       code: 200,
  //       data: data
  //     }
  //   }catch(e){
  //     console.log(e)
  //     this.ctx.body ={
  //       code: 0,
  //       message: '服务器错误'
  //     }
  //   }
  // };
  async single(){
    let id = this.ctx.params.id;
    try{
      let Sections = await this.ctx.model.Section.findAll({ 
        where:{
          chapter_id: id
        },
        order: [['sort','DESC']]
      }).then(res=>{
        return JSON.parse(JSON.stringify( res,null,4))
      })
      this.ctx.body = {
        code: 200,
        data: Sections
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code: 0,
        message:'服务器错误'
      }
    }
  }
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
  // async sort() {
  //   let params = this.ctx.request.body.params;
  //   try{
  //     await params.map(async (data)=>{
  //     console.log(data.sort)
  //       this.ctx.model.Section.update(
  //         {sort: data.sort},
  //         { where:{id:data.id} }).then(res=>{
  //           console.log(res)
  //       })
  //       this.ctx.body={
  //         code: 200,
  //         message:'成功了'
  //       }
  //       console.log(21321)
  //     })
  //   }catch(e){
  //     console.log(e)
  //     this.ctx.body={
  //       code:0,
  //       message:'服务器错误'
  //     }
  //   }
  // };
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
  }
}

module.exports = SectionController;