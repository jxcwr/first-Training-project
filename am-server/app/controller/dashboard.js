/*
 * @Author: HeAo
 * @Date: 2021-12-08 16:38:40
 * @LastEditTime: 2021-12-21 22:13:47
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \am-server\app\controller\dashboard.js
 */

/**
 * @Controller dashboard-controller:大屏相关接口
*/

const { Controller } = require("egg");
const Message = require("../utils/Message");

class DashboardController extends Controller {

  /**
   * @Router get /dashboard/queryDeviceOnlineNumber
   * @summary 统计设备在线、离线数量
   * @apikey
  */
  async queryDeviceOnlineNumber () {
    const { ctx, service } = this
    const data = await service.dashboard.queryDeviceOnlineNumber()
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/queryEngineerBindDeviceNumber
   * @summary 统计工程使用的设备数量
   * @apikey
  */
  async queryEngineerBindDeviceNumber () {
    const { ctx, service } = this
    const data = await service.dashboard.queryEngineerBindDeviceNumber()
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/findEngineerDeviceTree
   * @summary 查询工程设备树
   * @apikey
  */
  async findEngineerDeviceTree () {
    const { ctx, service } = this
    // 调用service
    const data = await service.engineer.findEngineerDeviceTree(ctx.query)
    // 给出响应
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/queryMouthData
   * @summary 分页多条件统计设备当月数据信息
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @request query string date 月份(默认当月),例如:2021-12
   * @apikey
  */
  async queryMouthData () {
    const { ctx, service } = this
    const data = await service.dashboard.queryMouthData(ctx.query)
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/querycityPM
   * @summary 返回城市空气质量数据
   * @apikey
  */
   async querycityPM () {
    const { ctx, service } = this
    const data = await service.dashboard.querycityPM()
    ctx.body = Message.success(data)
  }

    /**
   * @Router get /dashboard/querymonthCG
   * @summary 返回各个月份空气质量数据
   * @apikey
  */
     async querymonthCG () {
      const { ctx, service } = this
      const data = await service.dashboard.querymonthCG()
      ctx.body = Message.success(data)
    }
}

module.exports = DashboardController
