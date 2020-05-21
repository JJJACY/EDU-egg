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



  router.post('/admin/login',controller.admin.login);  //管理员登陆
  router.post('/sms/send',controller.auth.send);

  router.get('/qiniu-uploadtoken',controller.qiniu.uploadToken);//七牛云上传

  router.get('/admin/courses/:id',controller.course.index); //test
  // router.put('/admin/chapter/sort',controller.chapter.sort); // 排序

  router.get('/admin/course',controller.course.all);  //课程
  router.get('/admin/course/:id',controller.course.single) //课程详情
  router.post('/admin/course',controller.course.insert); //新增课程
  router.delete('/admin/course/:id',controller.course.delete)  //删除课程

  router.put('/admin/chapter/sort',controller.chapter.sort); //排序
  router.get('/admin/chapter',controller.chapter.all); //章
  router.post('/admin/chapter',controller.chapter.insert); //新增章
  router.get('/admin/chapter/:id',controller.chapter.single);
  router.put('/admin/chapter/:id',controller.chapter.update); //修改章
  router.delete('/admin/chapter/:id',controller.chapter.delete); //删除章
  

  router.post('/admin/section',controller.section.insert); //新增章
  router.get('/admin/section/:id',controller.section.single); //节
  router.delete('/admin/section/:id',controller.section.delete); //删除节

  router.get('/admin/company',controller.company.all);  //企业
  router.get('/admin/company/:id',controller.company.single) //企业详情
  router.post('/admin/company',controller.company.insert); //新增企业
  router.put('/admin/company/:id',controller.company.update) //修改企业
  router.delete('/admin/company/:id',controller.company.delete)  //删除企业

  router.get('/admin/stack',controller.stack.all);  //技能
  router.get('/admin/stack/:id',controller.stack.single); 
  router.post('/admin/stack',controller.stack.insert);  //新增技能

  router.get('/admin/zhiye',controller.zhiye.all);
  router.get('/admin/zhiye/:id',controller.zhiye.single);
  router.post('/admin/zhiye',controller.zhiye.insert); //新增职业
};
