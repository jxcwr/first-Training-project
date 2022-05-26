/*
 * @Author: HeAo
 * @Date: 2021-12-03 10:48:52
 * @LastEditTime: 2021-12-10 17:08:24
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\controller\engineer.js
 */
const { Controller } = require("egg");
const Message = require('../utils/Message')

/**
 * @Controller engineer-controller:工程相关接口
*/

class EngineerController extends Controller {
  /**
   * @Router post /engineer/saveOrUpdate
   * @summary 保存或更新
   * @description serial_number,name,type为必须提供字段
   * @request body engineerReqData
   * @apikey
  */
  async saveOrUpdate () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      serial_number: 'string',
      name: 'string',
      type: 'string',
      charge_id: 'number',
      customer_name: 'string',
      customer_telephone: 'string'
    })
    // 调用service
    await service.engineer.saveOrUpdate(ctx.request.body)
    // 给出响应
    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router get /engineer/pageQuery
   * @summary 分页查询工程信息
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据量
   * @request query string charge_id 区域经理id
   * @request query string customer_id 客户id
   * @apikey
  */
  async pageQuery () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const resVm = await service.engineer.pageQuery(ctx.query)
    ctx.body = Message.success(resVm)
  }

  /**
   * @Router delete /engineer/deleteById
   * @summary 根据id删除工程信息
   * @request query string *id 工程id
   * @apikey
  */

  async deleteById () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.engineer.deleteById(ctx.query.id)

    ctx.body = Message.success('删除成功')
  }

  /**
   * @Router get /engineer/bindService
   * @summary 为工程绑定设备
   * @request query number *engineer_id 工程id
   * @request query number *device_id 设备id
   * @request query number *latitude 设备安装经度
   * @request query number *longitude 设备安装纬度
   * @request query string video 设备视频地址
   * @apikey
  */

  async bindService () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      engineer_id: 'string',
      device_id: 'string',
    }, ctx.query)
    await service.engineer.bindService(ctx.query)

    ctx.body = Message.success('绑定成功')
  }


  /**
   * @Router get /engineer/finish
   * @summary 结束工程
   * @request query string *id 工程id
   * @apikey
  */
  async finish () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      id: 'string'
    }, ctx.query)
    // 调用service
    await service.engineer.finish(ctx.query)
    // 给出响应
    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router get /engineer/findEngineerDeviceTree
   * @summary 查询工程设备树
   * @request query string charge_id 区域经理id
   * @request query string customer_id 客户id
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
   * @Router get /engineer/unbindDevice
   * @summary 解绑单个设备
   * @request query string *engineer_id 工程id
   * @request query string *device_id 设备id
   * @apikey
  */
  async unbindDevice () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      engineer_id: 'string',
      device_id: 'string'
    }, ctx.query)
    // 调用service
    await service.engineer.unbindDevice(ctx.query)
    // 给出响应
    ctx.body = Message.success('解绑成功')
  }
}

module.exports = EngineerController
