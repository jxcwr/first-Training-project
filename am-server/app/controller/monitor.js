/*
 * @Author: HeAo
 * @Date: 2021-12-07 11:17:13
 * @LastEditTime: 2021-12-08 16:33:54
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\controller\monitor.js
 */

/**
 * @Controller monitor-controller:数据相关接口
*/
const { Controller } = require("egg");
const Message = require("../utils/Message");

class MonitorController extends Controller {
  /**
   * @Router get /monitor/pageQuery
   * @summary 分页多条件查询设备数据信息
   * @description begin_time和end_time为一组数据，传都传，不传都不传，不允许传单个时间
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据量
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @request query string begin_time 开始时间
   * @request query string end_time 结束时间
   * @apikey
  */
  async pageQuery () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const data = await service.monitor.pageQuery(ctx.query)
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /monitor/pageQueryTodayData
   * @summary 分页多条件查询设备当天数据信息
   * @description begin_time和end_time为一组数据，传都传，不传都不传，不允许传单个时间
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据量
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @apikey
  */
  async pageQueryTodayData () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const data = await service.monitor.pageQueryTodayData(ctx.query)
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /monitor/queryMouthData
   * @summary 分页多条件统计设备当月数据信息
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @request query string date 月份(默认当月),例如:2021-12
   * @apikey
  */
  async queryMouthData () {
    const { ctx, service } = this
    const data = await service.monitor.queryMouthData(ctx.query)
    ctx.body = Message.success(data)
  }
}

module.exports = MonitorController
