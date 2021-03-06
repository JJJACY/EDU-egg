const Controller = require('egg').Controller;

class StoryController extends Controller {
  async insert() {
    let name = this.ctx.request.body.name;
    let version_id = this.ctx.request.body.version_id;
    let project_id = this.ctx.request.body.project_id;
    let sort = this.ctx.request.body.sort;
    let created_at = this.ctx.request.body.created_at;
    if(!name || !project_id || !sort || !version_id){
      this.ctx.body= {
        code: 0,
        message: '缺少参数!'
      }
    }
    try{
      await this.ctx.model.Story.create({
        version_id,project_id,name,sort,created_at
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
  async index(){
    let version_id = this.ctx.params.id;
    try{
      let Version= await this.ctx.model.Version.findByPk(version_id).then(res=>{
        return JSON.parse(JSON.stringify(res,null,4))
      })
      if(!Version){
        this.ctx.body={
          code:0,
          message:'请先添加版本！'
        }
      }
      let storyAll = await this.ctx.model.Story.findAll({
        where:{version_id:Version.id},
        order: [['sort','ASC']]
      }).then(res=>{
        return JSON.parse(JSON.stringify(res,null,4))
      })
      console.log(storyAll,123123123)
      await Promise.all(storyAll.map(async data=>{
        console.log(data.id)
        data.taskAll = await this.ctx.model.Task.findAll({
          where:{story_id: data.id},
          order: [['sort','ASC']]
        }).then(res=>{
          return JSON.parse(JSON.stringify(res,null,4))
        })
      }) )
      this.ctx.body={
        code: 200,
        data: storyAll
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async sort(){
    let params = this.ctx.request.body.params;
    try{
      // Promise.all(params.map(async (data,index)=>{
      //   await this.ctx.model.Story.update(
      //     {sort: index},
      //     { where:{id: data.id} })
      // }))
      // this.ctx.body={
      //   code: 200,
      //   message:'成功了'
      // }
    }catch(e){
      this.ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  };
  async update(){
    let id = this.ctx.params.id;
    let name = this.ctx.request.body.name;
    let updated_at = this.ctx.request.body.updated_at;
    if(!name){
      this.ctx.body ={
        code: 0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Story.update({
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
  async delete(){
    let id = this.ctx.params.id;
    try{
      await this.ctx.model.Story.destroy( { where:{id} } ).then(res=>{
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

module.exports = StoryController;