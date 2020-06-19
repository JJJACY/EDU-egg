const Controller = require('egg').Controller;

class SkillController extends Controller {
  async all(){
    try{
      let all = await this.ctx.model.Skillquestion.findAll()
      let total = all.length
      let  skill= await this.ctx.model.Skillquestion.findAll({ offset: 0, limit: 10 }).
      then(res=>{
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code: 200,
        data: skill,
        total: total
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async pagina(){
    let nowPage = this.ctx.request.body.nowPage;
    console.log(nowPage)
    try{
      let offset = nowPage*10 - 10;
      let skill =await this.ctx.model.Skillquestion.findAll({ offset: offset, limit: 10 }).then(res=>{
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body ={
        code:200,
        data: skill
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  }
  async insert(){
    let stem = this.ctx.request.body.question;
    let stack_id = this.ctx.request.body.stack_id;
    let level = this.ctx.request.body.level;
    let option = this.ctx.request.body.option;
    let currect = this.ctx.request.body.currect;
    let created_at = this.ctx.request.body.created_at; 
    if( !stem || !stack_id || !level || !option || !currect){
      this.ctx.body={
        code:0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Skillquestions.create({
        stem,stack_id,level,option,currect,created_at
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
  }
  async single(){
    let id = this.ctx.params.id;
    try{
      let skillData = await this.ctx.model.Skillquestions.findByPk(id).then( res=>{
        return  JSON.parse(JSON.stringify(res, null, 4))
      })
      this.ctx.body={
        code: 200,
        data: skillData 
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  async update(){

  };
  async delete(){
    let id = this.ctx.params.id;
    try{
      await this.ctx.model.Skillquestions.destroy( { where:{id} } ).then(res=>{
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
  async similar(){
    let stack_id = this.ctx.params.id;
    try{
      let question = await this.ctx.model.Skillquestion.findAll({
        order: [['id', 'ASC']]
      },{ where:{stack_id}}).then(res=>{
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      let index =  parseInt(Math.random().toString().slice(-20)*100)
      let arr = question.slice(index,index+20)
      console.log(arr)
      this.ctx.body ={
        code:200,
        data: arr
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
module.exports = SkillController;