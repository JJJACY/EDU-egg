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


  router.post('/admin/login',controller.manager.login); //
  // router.post('/admin/login',controller.admin.login);  //管理员登陆
  router.post('/wxlogin/send',controller.auth.send); //wx获取token
  router.post('/admin/authority',controller.manager.authority) //鉴权

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
  router.get('/admin/stackstatus',controller.stack.findstatus); //状态打开
  router.post('/admin/stack',controller.stack.insert);  //新增技能
  router.post('/admin/stack/pagina',controller.stack.pagina); //技能分页


  //题库
  router.get('/admin/skill/question',controller.skill.all); //题目列表
  router.post('/admin/skill/question',controller.skill.insert) //新增题目
  router.get('/admin/skill/question/:id',controller.skill.single); //题目详情
  router.delete('/admin/skill/question/:id',controller.skill.delete) //删除题目
  router.post('/admin/skill/pagina',controller.skill.pagina); //题目分页
  router.get('/admin/stack/:id/random',controller.skill.similar); //随机20题



  //管理员。。。。。。
  router.get('/admin/manager/permissiongps',controller.permissiongroups.all); // all权限组
  // router.get('/admin/manager/permission',controller.permission.all) //权限
  // router.get('/admin/manager/permissiongpss',controller.permissiongroups.alldata)
  
  router.get("/admin/role",controller.role.all); //角色列表
  router.get('/admin/role/:id',controller.role.single); //角色详情
  router.post('/admin/role',controller.role.insert);  //角色新增 
  router.put('/admin/role/:id',controller.role.update); //角色修改
  router.delete('/admin/role/:id',controller.role.delete); //角色删除
  

  router.get('/admin/manager',controller.manager.all); //管理员列表
  router.get('/admin/manager/:id',controller.manager.single);//管理员详情
  router.post('/admin/manager',controller.manager.insert); //管理员增加
  router.put('/admin/manager/:id',controller.manager.update); //管理员修改
  router.delete('/admin/manager/:id',controller.manager.delete); //删除管理员

  //广告物料相关
  router.post('/admin/advertise',controller.advertise.insert); //广告新增
  router.get('/admin/advertise',controller.advertise.all); //获取广告位
  router.get('/admin/advertise/:id',controller.advertise.single); //广告位置详情
  router.put('/admin/advertise/:id',controller.advertise.update); //广告位修改
  router.delete('/admin/advertise/:id',controller.advertise.delete); //广告位删除

  router.post('/admin/material',controller.material.insert); //新增物料
  router.get('/admin/material',controller.material.all); //物料
  router.get('/admin/material/:id',controller.material.single); //物料详情
  router.put('/admin/material/:id',controller.material.update);//物料修改
  router.delete('/admin/material/:id',controller.material.delete);//删除物料

  router.post('/admin/advertises/material',controller.advertisematerial.insert); //新增广告物料关联
  router.get('/admin/advertises/material/:id',controller.advertisematerial.single); //广告物料关联列表

  router.post('/admin/sms/send',controller.smslog.smsSend); //获取验证码
  router.post('/admin/sms/login',controller.smslog.smslogin); //登陆



  router.post('/admin/user/user-info',controller.user.single); //单个用户信息
  router.put('/admin/user/user-info/:id',controller.user.update); //修改用户信息
  router.put('/admin/user/phone-bind',controller.user.bindphone); //手机绑定
  router.put('/admin/user/phone-unbind',controller.user.unbindphone); //手机解绑
  router.put('/admin/user/wechat-unbind',controller.user.unbindwx); //wx解绑
  // router.put('/admin/user/wechat-bind',controller.auth.bindwx);// 微信绑定

  router.get('/admin/course-recommand',controller.course.newclass); //首页课程推荐

};
