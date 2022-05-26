/*
 * @Description: 
 * @Author: zyj
 * @Date: 2021-12-06 14:51:32
 * @FilePath: /am/server/am-server/app/controller/workorder.js
 * @LastEditTime: 2021-12-21 13:51:09
 * @LastEditors: Please set LastEditors
 */
const { Controller } = require("egg");
const Message = require('../utils/Message')

/**
 * @Controller workorder-controller:工单相关接口
*/

class WorkOrderController extends Controller {

  /**
   * @Router get /workorder/pageQuery
   * @summary 分页多条件查询工单信息
   * @description 给begin_time和finish_time两个值可以查询到在此时间范围内创建的工单，传入值必须为时间戳,工单状态分为: 待接单, 进行中，已完成,p123为生成工单时的照片，photo1,photo2,photo3为结束工单时的照片
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据条数
   * @request query string status 工单状态
   * @request query string type 工单类型
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @request query string account_id 账户id
   * @request query string begin_time 工单开始时间
   * @request query string end_time 工单结束时间
   * @apikey
  */
  async pageQuery () {
    //
    const { ctx, service } = this
    // 参数校验  必传参数在这里
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const data = await service.workorder.pageQuery(ctx.query)
    ctx.body = Message.success(data)
  }


  /**
   * @Router post /workorder/saveOrUpdate
   * @summary 保存或更新 若传入id为修改操作，无id为新增操作
   * @request body workOrderData
   * @apikey
  */
  async saveOrUpdate () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      type: 'string',
    })
    // 调用service
    await service.workorder.saveOrUpdate(ctx.request.body)
    // 给出响应
    ctx.body = Message.success('操作成功')
  }


  /**
  * @Router delete /workorder/deleteById
  * @summary 根据id删除
  * @request query string *id 工单id
  * @apikey
 */
  async deleteById () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.workorder.deleteById(ctx.query.id)

    ctx.body = Message.success('删除成功')
  }


  /**
  * @Router get /workorder/findById
  * @summary 根据工单id查询工单详情
  * @request query string *id 工单id
  * @apikey
 */
  async findById () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    const resOr = await service.workorder.findById(ctx.query.id)

    ctx.body = Message.success(resOr)
  }

  /**
   * @Router post /workorder/repairOrder
   * @summary 报修
   * @description engineer_id,device_id 为必填字段
   * @request body repairOrderData
   * @apikey
  */
  async repairOrder () {
    const { ctx, service } = this
    ctx.validate({
      bill_why: 'string',
    })
    await service.workorder.repairOrder(ctx.request.body)

    ctx.body = Message.success('报修成功')
  }

  /**
   * @Router get /workorder/takeOrder
   * @summary 工人接单根据工单id修改工单状态为进行中
   * @description id,account_id 为必填字段
   * @request query string *id 工单id
   * @request query string *account_id 账户id
   * @apikey
  */
  async takeOrder () {
    const { ctx, service } = this
    const reqData = {
      id: ctx.query.id,
      account_id: ctx.query.account_id,
      status:'进行中'
    }
    await service.workorder.takeOrder(reqData)
    ctx.body = Message.success('操作成功')
  }

  /**
  * @Router get /workorder/finishOrder
  * @summary 工人接单根据工单id修改工单状态为已完成
  * @description id,photo1,photo2,photo3 为必填字段，且三个必须一起传
  * @request query string *id 工单id
  * @request query string *photo1 结束照片1
  * @request query string *photo2 结束照片2
  * @request query string *photo3 结束照片3
  * @request query string *finish_time 工单完成时间
  * @apikey
 */
  async finishOrder () {
    const { ctx, service } = this
    const reqData = {
      id: ctx.query.id,
      photo1:ctx.query.photo1,
      photo2:ctx.query.photo2,
      photo3:ctx.query.photo3,
      finish_time:ctx.query.finish_time,
      status:'已完成'
    }
    await service.workorder.finishOrder(reqData)
    ctx.body = Message.success('操作成功')
  }

  /**
  * @Router get /workorder/cancelOrder
  * @summary 取消待接单工单
  * @description 工单id为必填字段
  * @request query string *id 工单id
  * @apikey
 */
  async cancelOrder () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.workorder.cancelOrder(ctx.query.id)
    ctx.body = Message.success('操作成功')
  }
  async cancelOrder (id) {
    const { mysql } = this.app
    //根据ID查询工单详细信息
    const order = await mysql.get('am_workorder', { id })
    if (order.status == '待接单') {
      await mysql.delete('am_workorder', { id })
    } else {
      throw new BusinessError('进行中、已完成状态工单不可取消', 501)

    }
  }


}

module.exports = WorkOrderController

