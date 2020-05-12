// 使用 Nodejs 中的加密模块
// const crypto = require('crypto');
const JWT = require('jsonwebtoken');
const authCode = require('./../utils/authCode.js')

module.exports = () => {
  return async function(ctx,next){
    try{
      let token = ctx.header.cookie;
      // console.log(token)
      if(!token){
        ctx.body = {
          code: 0,
          message:'未登录,请先登录'
        }
        return
      }
      // 解密
      // let admins = authCode(token,'DECODE');
      
      // if(admins.length<1){
      //   ctx.body ={
      //     code: 200,
      //     message:'该管理员账号无效'
      //   }
      //   return
      // } 
      // let admin = admins.split('/t')
      // 与数据库账号比对
      // let clock = await this.ctx.model.Admin.findOne({
      //   where:{ manager[0],manager[1],manager[2] }
      // })
          
          
        
      next()
    }catch(err){
      console.log(err)
      ctx.body ={
        code: 0,
        message:'服务器错误'
      }
    }
  }
   
  
  
};


