/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588725781226_7019';

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  },

  // config.cors = {
  //   credentials: true,
  //   origin: ctx => ctx.get('origin'),
  // },

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username:'root',
    password:'',
    database: 'edu',  //
  };

  // add your middleware config here
  config.jwt = {
    secret: 'egg-api-jwt',
  };
  
  config.middleware = [];
  //多出来的配置==========
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  };

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.qiniu ={
    AccessKey: 'ckYYxI4xwp2etJ9okRlLO0tfzaSkm9hoQte2XKNu',
    SecretKey: 't9yqigKlMgw_qmy9lZjyTJZlKPBnSVAkqpciaA6J',
    buket: 'edu-egg',
    domain: 'qa3xmeqcq.bkt.clouddn.com'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};


