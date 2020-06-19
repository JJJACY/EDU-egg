const Controller = require('egg').Controller;
const {formatTime} =require("./../utils/date.js");
const authCodeFunc = require('./../utils/authCode.js'); 

class UserController extends Controller {
  //查询绑定状态
  async single(){
    let token = this.ctx.request.body.token;
    let Token = authCodeFunc(token,'DECODE');
    let id = Token.str.split('\t')[0];
    console.log(id,Token)
    try{
      let states = await this.ctx.model.Users.findAll({
        where:{id}
      }).then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      console.log(states)
      this.ctx.body ={
        code: 200,
        data: states
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:200,
        message:'服务器错误'
      }
    }
  }
  async update(){
    let id = this.ctx.request.body.id;
    let name = this.ctx.request.body.name;
    let sex = this.ctx.request.body.sex;
    let birthday = this.ctx.request.body.birthday;
    let introduction = this.ctx.request.body.introduction;
    if(!name || !sex || !birthday | !introduction){
      this.ctx.body={
        code: 0,
        message:'缺少参数'
      }
    }
    try{
      await this.ctx.model.Users.update({
        name,sex,birthday,introduction,updated_at: formatTime( new Date()  )
      },{where:{id:id}})
      this.ctx.body ={
        code: 200,
        message:'修改成功'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:200,
        message:'服务器错误'
      }
    }
  };
  //改变绑定状态
  async bindphone(){
    let unionid = this.ctx.request.body.unionid;
    let phone = this.ctx.request.body.phone;
    console.log(phone)
    try{
      await this.ctx.model.Users.update({ phone},{
        where:{unionid}
      })
      this.ctx.body ={
        code: 200,
        message: '绑定成功!'
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:200,
        message:'服务器错误'
      }
    }
  };
  //解绑手机
  async unbindphone(){
    let token = this.ctx.request.body.token;
    let Token = authCodeFunc(token,'DECODE');
    let id = Token.str.split('\t')[0];
    try{
      let userinfo = await this.ctx.model.Users.findAll({
        where:{id}
      }).then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      console.log(userinfo)
      if(userinfo.unionid === null){
        this.ctx.body = {
          code: 0,
          message:'请先绑定微信，再尝试解绑手机'
        }
      }else{
        await this.ctx.model.Users.update({ phone:null},{
          where:{id}
        })
        this.ctx.body ={
          code: 200,
          message: '解绑成功!'
        }
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:200,
        message:'服务器错误'
      }
    }
  };
  //解绑微信
  async unbindwx(){
    let token = this.ctx.request.body.token;
    let Token = authCodeFunc(token,'DECODE');
    let id = Token.str.split('\t')[0];
    try{
      let userinfo = await this.ctx.model.Users.findAll({
        where:{id}
      }).then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      if(userinfo.phone === null){
        this.ctx.body = {
          code: 0,
          message: '请先绑定手机，再尝试解绑微信'
        }
      }else{
        await this.ctx.model.Users.update({ unionid:null },{
          where:{id}
        })
        this.ctx.body ={
          code: 200,
          message: '解绑成功!'
        }
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code:200,
        message:'服务器错误'
      }
    }
  };
}
module.exports = UserController