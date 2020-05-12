// 'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
// module.exports = app => {
//   const { router, controller } = app;
//   router.get('/', controller.home.index);
// };

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  const csrf = app.middleware.csrf({ threshold: 1024 });

  
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);



  router.post('/admin/login',controller.admin.login);  //管理员登陆
  router.post('/sms/send',controller.auth.send);

  router.get('/qiniu-uploadtoken',controller.qiniu.uploadToken);//七牛云上传

  router.get('/admin/course',controller.course.all);  //课程
  router.post('/admin/course',controller.course.insert); //新增课程
};
