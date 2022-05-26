/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-22 15:51:23
 * @LastEditors: charles
 * @LastEditTime: 2021-12-22 16:13:05
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    // 应用已经启动完毕
    const ctx = await this.app.createAnonymousContext();
    let params = {
      page:1,
      pageSize:100,
      online_status:1,
    }
    const devices = await ctx.service.device.pageQuery(params);
    // 依次打开所有在线设备
    for(let d of devices.list){
      await ctx.service.device.openDevice(d.id);
    }
    console.log('成功启动了',devices.list.length,'个设备');
  }
}

module.exports = AppBootHook;