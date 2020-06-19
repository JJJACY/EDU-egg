const Controller = require('egg').Controller;
const axios = require('axios');
const {formatTime} =require("./../utils/date.js");
const authCodeFunc = require('./../utils/authCode.js');


class AuthController extends Controller{
  async send() {
    const code  = this.ctx.request.body.code;
    try{
      const userInfo = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf31cb4f589ed68c3&secret=69c8c3175f0db105541943aa5f3f45dd&code=${code}&grant_type=authorization_code`).then(res=>{
        let wxtoken = res.data;
        return axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${wxtoken.access_token}&openid=${wxtoken.openid}`)
      }).then(res => {
        let data =  res.data;
        return data;
      })
      console.log(userInfo)
      let unionid = userInfo.unionid;
      let name = userInfo.nickname;
      let avatar_url = userInfo.headimgurl;
      // let created_at = formatTime(new Date());
      let sex = userInfo.sex;
      let hasunionid = await this.ctx.model.Users.findAll({
        where: {unionid}
      }).then(res => {
        return JSON.parse(JSON.stringify(res, null, 4))
      })
      console.log(hasunionid[0],111)
      if(hasunionid.length <=0){
        await this.ctx.model.Users.create({
          unionid,name,avatar_url,sex,created_at:formatTime(new Date())
        })
      }
      let id = hasunionid[0].id;
      let nickname = hasunionid[0].nickname;
      let auth_Code = id +'\t'+ nickname +'\t'+ unionid;
      let token = authCodeFunc(auth_Code,'ENCODE');
      this.ctx.cookies.set('ac', auth_Code, { maxAge: 24* 60 * 60 * 1000, httpOnly: true });
      console.log(hasunionid,111)
      this.ctx.body={
        code:200,
        message:'登陆成功',
        data:userInfo,
        token
      }
    }catch(e){
      console.log(e)
      this.ctx.body ={
        code: 0,
        message: '服务器错误'
      }
    }
  };
  //微信绑定
  // async bindwx(){
  //   const code  = this.ctx.request.body.code;
  //   console.log(code)
  //   try{
  //     this.ctx.body ={
  //       code:200,
  //       message:'123'
  //     }
      
  //   }catch(e){
  //     console.log(e)
  //     this.ctx.body ={
  //       code:200,
  //       message:'服务器错误'
  //     }
  //   }
  // }
}
module.exports = AuthController;