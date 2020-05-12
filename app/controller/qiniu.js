const Controller = require('egg').Controller;
const config = require("./../../config/config.default.js");
const qiniu = require("qiniu");


class QiniuController extends Controller {
  async uploadToken(){
    // console.log(this.ctx.app.config,222)
    try{
      const accessKey = this.ctx.app.config.qiniu.AccessKey;
      const secretKey = this.ctx.app.config.qiniu.SecretKey;

      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      console.log(mac ,11111111)
      
      var options = {
        scope: 'edu-egg',
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);
      // console.log(uploadToken)

      this.ctx.body ={
        token:uploadToken,
        domain:'http://qa3xmeqcq.bkt.clouddn.com'
      }
      // res.json({
      //   token:uploadToken,
      //   domain:'qa3xmeqcq.bkt.clouddn.com'
      // })
    }catch(err){
      console.log(err)
      this.ctx.body = {
        code: 0,
        message: '服务器错误'
      }
    }
  } 
}

module.exports = QiniuController