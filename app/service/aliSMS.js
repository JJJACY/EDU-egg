const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');

class aliSMSService extends Service {
  /**
     * 发送短信
     * @param { String } phone 用户手机号 
     * @param { String } code 生成的随机验证码
     */
  async sendSMS(phone, code) {
    const client = await this._client();
    const params = await this._params(phone, code);
    const requestOption = await this._requestOption();

    try {
      const ret = await this._send(client, params, requestOption);
      // {"Message":"OK","RequestId":"80A35575-6DD3-4A7D-B4AD-723F918CBBA5","BizId":"627317463804615179^0","Code":"OK"}
      return JSON.parse(ret);
    } catch (err) {
      console.log(err)
      // this.ctx.errorHandle(err)
    }

  }

  async _client() {
    return new Core({
      accessKeyId: this.config.aliSMS.accessKeyId,
      accessKeySecret: this.config.aliSMS.secretAccessKey,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    });
  }

  async _params(phone, code) {
    return {
      "RegionId": this.config.aliSMS.regionId,
      "PhoneNumbers": `${phone}`,
      "SignName": this.config.aliSMS.SignName,
      "TemplateCode": this.config.aliSMS.TemplateCode,
      "TemplateParam": `{\"code\":${code}}`
    }
  }
  async _requestOption() {
    return {
       method: 'POST'
    }
  }


  async _send(client, params, requestOption) {
    return new Promise((resolve, reject) => {
      client.request('SendSms', params, requestOption).then((result) => {
        resolve(JSON.stringify(result))
      }, (ex) => {
          reject(ex)
      })
    })
  }
}

module.exports =aliSMSService;