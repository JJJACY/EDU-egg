const Controller = require('egg').Controller;

class zhiyePathController extends Controller {
  async insert() {
    let zhiye_id = this.ctx.request.body.zhiye_id;
    let name = this.ctx.request.body.name;
    let sort = this.ctx.request.body.sort;
    let created_at = this.ctx.request.body.created_at;
    if(!zhiye_id){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Zhiyepath.create({
        zhiye_id,name,sort,created_at
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
      Promise.all(params.map(async (data,index)=>{
        await this.ctx.model.Zhiyepath.update(
          {sort: index},
          { where:{id: data.id} })
          Promise.all(data.courseAll.map( async( arr,idx)=>{
          await this.ctx.model.Zhiyecourse.update(
            { sort: idx,path_id:data.id},
            { where: {id: arr.id} })
          }))

          Promise.all(data.courseAll.map( async( arr,idx)=>{
            console.log(arr)
            let id = arr.course_id;
            let data = await this.ctx.model.Course.findByPk(id).then( res=>{
              return JSON.parse(JSON.stringify(res, null, 4)) 
            })
            console.log(data.name)
            
          }))
      }))
      this.ctx.body={
        code: 200,
        message:'成功了',
      }
    }catch(e){
      console.log(1123,e)
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  };
  async update(){
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name;
    let description = this.ctx.request.body.description;
    if(!name || !description){
      this.ctx.body ={
        code: 0,
        message:'缺少参数'
      }
    }
    try {
      await this.ctx.model.Zhiyepath.update({
        name:name,description:description},{where: {id:id}}
      )
      this.ctx.body={
        code: 200,
        message:'修改成功！'
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  };
  async delete(){
    let id = this.ctx.parse.id;
    try {
      await this.ctx.model.Zhiyepath.destroy({where: {id}}
      )
      this.ctx.body={
        code: 200,
        message:'删除成功！'
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
    
  }
}

module.exports = zhiyePathController;