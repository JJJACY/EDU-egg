const Controller = require('egg').Controller;
const {formatTime} =require("./../utils/date.js");
const authCodeFunc = require('./../utils/authCode.js'); 


class smslogController extends Controller{
  async smsSend(){
    let phone = this.ctx.request.body.phone;
    try{
      let sendcode = await this.ctx.model.Smslog.findAll({
        where:{phone}
      }).then( res=>{
        return JSON.parse(JSON.stringify(res, null, 4)) 
      })
      let code = Math.random().toString().slice(-6);
      sendcode.map(data=>{
        // console.log(data.code,123123123)
        if(data.code !== ""){
          this.ctx.model.Smslog.update({
            code, updated_at:formatTime(new Date())
          },{ where:{phone} })
        }
      })
      this.ctx.body={
        code: 200,
        message: code
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code: 0,
        message:'服务器错误'
      }
    }
  }
  async smslogin(){
    let phone = this.ctx.request.body.phone;
    try{
      let hasphone = await this.ctx.model.Smslog.findAll({
        where:{phone: phone}
      }) 
      if(hasphone.length > 0){ 
        let time = await this.ctx.model.Smslog.findAll({
          where:{phone}
        }).then( res=>{
          return JSON.parse(JSON.stringify(res, null, 4)) 
        })
        let newTime;
        time.some(data => {
          // console.log(data)
          if(data.created_at)newTime = data.created_at;
          if(data.updated_at)newTime = data.updated_at; 
        })
        if(  new Date().getTime() - new Date(newTime).getTime() > 60000 ){
          return this.ctx.body={
            code: 200,
            message:'验证码已过期,请重新发送！'
          }
        }
        let code = this.ctx.request.body.code;
        let smsResult = await this.service.aliSMS.sendSMS(phone,code);
        // console.log(smsResult,1111111)
        if(smsResult.Code ==  "OK"){
          let auth_Code = phone +'\t'+ code +'\t'+ smsResult.Message;
          let token = authCodeFunc(auth_Code,'ENCODE');
          this.ctx.cookies.set('ac', auth_Code, { maxAge: 24* 60 * 60 * 1000, httpOnly: true });
          this.ctx.body={ code: 200,message:'短信发送成功',token}
        }else{
          this.ctx.body = {code:0, message:'短信发送失败'}
        }
      }else{
        let sendcode = Math.random().toString().slice(-6)
        await this.ctx.model.Smslog.create({
          phone,
          code: sendcode,
          created_at: formatTime(new Date())
        })
        this.ctx.body={
          code:200,
          data: sendcode,
          message:'注册成功!'
        }
      }
    }catch(e){
      console.log(e)
      this.ctx.body={
        code:0,
        message:'服务器错误！'
      }
    }
  }
}
module.exports = smslogController