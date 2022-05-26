/*
 * @Author: HeAo
 * @Date: 2021-12-03 15:27:37
 * @LastEditTime: 2021-12-09 14:32:59
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\controller\device.js
 */
const { Controller } = require("egg");
const Message = require('../utils/Message')

/**
 * @Controller device-controller:设备相关接口
*/

class DeviceController extends Controller {
  /**
   * @Router post /device/saveOrUpdate
   * @summary 保存或更新
   * @description serial_number,name为必须提供字段,有id为修改，没有id为新增
   * @request body deviceReqData
   * @apikey
  */
  async saveOrUpdate () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      name: 'string',
      serial_number: 'string',
    })
    // 调用service
    await service.device.saveOrUpdate(ctx.request.body)
    // 给出响应
    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router get /device/pageQuery
   * @summary 多条件分页查询设备信息
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据量
   * @request query string name 工程名字(关键字模糊查询)
   * @request query string engineer_id 工程id
   * @request query string bind_status 绑定状态(1为绑定，0为未绑定)
   * @request query string online_status 在线状态(1为在线，0为离线)
   * @apikey
  */
  async pageQuery () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const resVm = await service.device.pageQuery(ctx.query)
    ctx.body = Message.success(resVm)
  }

  /**
   * @Router delete /device/deleteById
   * @summary 根据id删除设备信息
   * @request query string *id 设备id
   * @apikey
  */

  async deleteById () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.device.deleteById(ctx.query.id)

    ctx.body = Message.success('删除成功')
  }

  /**
   * @Router get /device/openDevice
   * @summary 开启设备
   * @request query string *id 设备id
   * @apikey
  */
  async openDevice () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.device.openDevice(ctx.query.id)

    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router get /device/closeDevice
   * @summary 关闭设备
   * @request query string *id 设备id
   * @apikey
  */
  async closeDevice () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.device.closeDevice(ctx.query.id)

    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router get /device/findDeviceDetail
   * @summary 查询设备详情
   * @request query string *id 设备id
   * @apikey
  */
  async findDeviceDetail () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    const detail = await service.device.findDeviceDetail(ctx.query.id)

    ctx.body = Message.success(detail)
  }
}

module.exports = DeviceController
