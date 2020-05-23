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
  //课程相关 API
  router.get('/admin/courses/:id',controller.course.index); //全部章节
  router.get('/admin/course',controller.course.all);  //课程
  router.get('/admin/course/:id',controller.course.single) //课程详情
  router.post('/admin/course',controller.course.insert); //新增课程
  router.delete('/admin/course/:id',controller.course.delete)  //删除课程
  router.put('/admin/chapter/sort',controller.chapter.sort); //排序
  router.post('/admin/chapter',controller.chapter.insert); //新增章
  router.put('/admin/chapter/:id',controller.chapter.update); //修改章
  router.delete('/admin/chapter/:id',controller.chapter.delete); //删除章
  
  router.post('/admin/section',controller.section.insert); //新增节
  router.get('/admin/section/:id',controller.section.single); //单个节
  router.put('/admin/section/:id',controller.section.update); //节更新
  router.put('/admin/sections/:id',controller.section.updatename); //更新节名
  router.delete('/admin/section/:id',controller.section.delete); //删除节
  //职业相关 API
  router.get('/admin/zhiye',controller.zhiye.all); //首页职业
  router.get('/admin/zhiye/:id',controller.zhiye.single); //单个职业
  router.post('/admin/zhiye',controller.zhiye.insert); //新增职业
  router.delete('/admin/zhiye/:id',controller.zhiye.delete);//删除职业
  router.post('/admin/zhiye/sort',controller.zhiyepath.sort); //排序
  router.get('/admin/zhiyes/:id',controller.zhiye.index); //全部路径课程
  router.post('/admin/zhiye/path',controller.zhiyepath.insert); //路径新增
  router.put('/admin/zhiye/path/:id',controller.zhiyepath.update);//路径编辑
  router.delete('/admin/zhiye/path/:id',controller.zhiyepath.delete);//路径删除
  router.post('/admin/zhiye/course',controller.zhiyecourse.insert); //职业路径课程关联
  router.delete('/admin/zhiye/course/:id',controller.zhiyecourse.delete);//职业路径课程删除
  //公司相关 API
  router.get('/admin/company',controller.company.all);  //企业
  router.get('/admin/company/:id',controller.company.single) //企业详情
  router.post('/admin/company',controller.company.insert); //新增企业
  router.put('/admin/company/:id',controller.company.update); //修改企业
  router.delete('/admin/company/:id',controller.company.delete);  //删除企业
  //项目相关 API
  router.get('/admin/project',controller.project.all); //全部项目
  router.post('/admin/project',controller.project.insert); //项目增加

  router.post('/admin/version',controller.version.insert); //版本新增
  router.get('/admin/project/version/:id',controller.version.index); //全部项目版本
  router.post('/admin/project/version/sort',controller.version.sort); //版本排序
  router.put('/admin/version/:id',controller.version.update); //修改版本
  router.delete('/admin/version/:id',controller.version.delete); //删除版本

  router.post('/admin/story',controller.story.insert);// 故事新增
  router.put('/admin/story/:id',controller.story.update); //修改故事
  router.delete('/admin/story/:id',controller.story.delete); //删除故事
  router.get('/admin/story/task/:id',controller.story.index); //全部故事任务

  router.post('/admin/task',controller.task.insert); //任务新增
  router.get('/admin/task/:id',controller.task.single); //单个任务
  router.put('/admin/task/:id',controller.task.update); //任务更新

  //技能相关 API
  router.get('/admin/stack',controller.stack.all);  //技能
  router.get('/admin/stack/:id',controller.stack.single); 
  router.post('/admin/stack',controller.stack.insert);  //新增技能

};
