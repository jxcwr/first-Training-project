/*
 * @LastEditTime: 2021-12-22 13:31:57
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /am/server/am-server/app/router.js
 * 别乱动！
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  //学生相关
  router.get('/student/pageQuery', jwt, controller.student.pageQuery);
  router.post('/student/saveOrUpdate', jwt, controller.student.saveOrUpdate);
  router.get('/student/findAll', jwt, controller.student.findAll);
  router.post('/student/register', controller.student.register);
  router.get('/student/findAllorder', jwt, controller.student.findAllorder);
  router.get('/student/cancelOrder', jwt, controller.student.cancelOrder);
  //食堂相关

  router.post('/canteen/register', controller.canteen.register);
  router.get('/canteen/findAll', jwt, controller.canteen.findAll);
  router.get('/canteen/pageQuery', jwt, controller.canteen.pageQuery);
  
  // 用户相关路由
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/getInfo', jwt, controller.user.getInfo);
  router.get('/user/setRole', jwt, controller.user.setRole);
  router.get('/user/logout', jwt, controller.user.logout);
  router.get('/user/findAll', jwt, controller.user.findAll);
  router.get('/user/pageQuery', jwt, controller.user.pageQuery);
  router.post('/user/saveOrUpdate', jwt, controller.user.saveOrUpdate);
  router.delete('/user/deleteById', jwt, controller.user.deleteById);
  router.patch('/user/updateUserFace', jwt, controller.user.updateUserFace);

  // 角色相关路由
  router.get('/role/findAll', jwt, controller.role.findAll);
  router.post('/role/saveOrUpdate', jwt, controller.role.saveOrUpdate);
  router.post('/role/setPrivilege', jwt, controller.role.setPrivilege);
  router.get('/role/findPrivilegesById', jwt, controller.role.findPrivilegesById);
  router.delete('/role/deleteById', jwt, controller.role.deleteById);


  // 权限相关路由
  router.post('/privilege/saveOrUpdate', jwt, controller.privilege.saveOrUpdate);
  router.get('/privilege/findPrivilegeTree', jwt, controller.privilege.findPrivilegeTree);
  router.delete('/privilege/deleteById', jwt, controller.privilege.deleteById);

  // 工程相关路由
  router.post('/engineer/saveOrUpdate', jwt, controller.engineer.saveOrUpdate);
  router.get('/engineer/pageQuery', jwt, controller.engineer.pageQuery);
  router.delete('/engineer/deleteById', jwt, controller.engineer.deleteById);
  router.get('/engineer/bindService', jwt, controller.engineer.bindService);
  router.get('/engineer/finish', jwt, controller.engineer.finish);
  router.get('/engineer/findEngineerDeviceTree', jwt, controller.engineer.findEngineerDeviceTree);
  router.get('/engineer/unbindDevice', jwt, controller.engineer.unbindDevice);

  // 设备相关路由
  router.post('/device/saveOrUpdate', jwt, controller.device.saveOrUpdate);
  router.get('/device/pageQuery', jwt, controller.device.pageQuery);
  router.delete('/device/deleteById', jwt, controller.device.deleteById);
  router.get('/device/openDevice', jwt, controller.device.openDevice);
  router.get('/device/closeDevice', jwt, controller.device.closeDevice);
  router.get('/device/findDeviceDetail', jwt, controller.device.findDeviceDetail);


  //工单相关路由
  router.get('/workorder/pageQuery', jwt, controller.workorder.pageQuery);
  router.post('/workorder/saveOrUpdate', controller.workorder.saveOrUpdate);
  router.delete('/workorder/deleteById', jwt, controller.workorder.deleteById);
  router.get('/workorder/findById', jwt, controller.workorder.findById);
  router.post('/workorder/repairOrder', jwt, controller.workorder.repairOrder);
  router.get('/workorder/takeOrder', jwt, controller.workorder.takeOrder);
  router.get('/workorder/finishOrder', controller.workorder.finishOrder);
  router.get('/workorder/cancelOrder', jwt, controller.workorder.cancelOrder);

  // 设备数据相关路由
  router.get('/monitor/pageQuery', jwt, controller.monitor.pageQuery);
  router.get('/monitor/pageQueryTodayData', jwt, controller.monitor.pageQueryTodayData);
  router.get('/monitor/queryMouthData', jwt, controller.monitor.queryMouthData);

  //系统配置相关路由
  router.get('/config/findAll', jwt, controller.config.findAll);
  router.post('/config/saveOrUpdate', jwt, controller.config.saveOrUpdate);
  router.get('/config/findByName', jwt, controller.config.findByName);
  router.delete('/config/deleteById', jwt, controller.config.deleteById);

  // 大屏相关接口
  router.get('/dashboard/queryDeviceOnlineNumber', controller.dashboard.queryDeviceOnlineNumber);
  router.get('/dashboard/queryEngineerBindDeviceNumber', controller.dashboard.queryEngineerBindDeviceNumber);
  router.get('/dashboard/findEngineerDeviceTree', controller.dashboard.findEngineerDeviceTree);
  router.get('/dashboard/queryMouthData', controller.dashboard.queryMouthData);
  router.get('/dashboard/querycityPM', controller.dashboard.querycityPM);
  router.get('/dashboard/querymonthCG', controller.dashboard.querymonthCG);


  //系统统计信息相关接口
  router.get('/count/countAll', controller.count.countAll);


};
