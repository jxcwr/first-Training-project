/*
 * @Author: jxc
 * @Date: 2021-12-17 17:10:28
 * @LastEditTime: 2021-12-22 10:31:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \am\am-server\app\controller\student.js
 */
const { Controller } = require('egg');
const Message = require('../utils/Message')


/**
 * @Controller student-controller:学生相关接口
*/

class StudentController extends Controller {

    /**
   * @Router post /student/register
   * @summary 注册账号
   * @description username, password为必须提供字段
   * @request body studentRegisterVM
  */

     async register () {
      const { ctx, service } = this
      // 参数校验
      ctx.validate({
        username: 'string',
        password: 'string',
      })
      await service.student.register(ctx.request.body,ctx.request.body.username)
  
      ctx.body = Message.success('注册成功')
    }

  /**
   * @Router get /student/findAll
   * @summary 获取所有学生用户信息
   * @apikey
  */

   async findAll () {
    const { ctx, service } = this
    const students = await service.student.findAll()

    ctx.body = Message.success(students)
  }



/**
   * @Router get /student/pageQuery
   * @summary 分页查询学生订单信息
   * @request query string *page
   * @request query string *pageSize
   * @apikey
  */

 async pageQuery () {
    const { ctx, service } = this
    const studentsVM = await service.student.pageQuery(ctx.query)

    ctx.body = Message.success(studentsVM)
  }
  /**
   * @Router post /student/saveOrUpdate
   * @summary 保存或更新学生订单
   * @description id为必须提供字段
   * @request body studentReqData
   * @apikey
  */
   async saveOrUpdate () {

    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      id: 'number'
    })
    // 调用service
    await service.student.saveOrUpdate(ctx.request.body)
    
    // 给出响应
    ctx.body = Message.success('操作成功')
  }
    /**
   * @Router get /student/findAllorder
   * @summary 获取所有学生订单信息
   * @apikey
  */

     async findAllorder () {
      const { ctx, service } = this
      const orders = await service.student.findAllorder()
  
      ctx.body = Message.success(orders)
    }
     /**
  * @Router get /student/cancelOrder
  * @summary 学生取消订单
  * @description 订单order_id为必填字段
  * @request query string *order_id 订单order_id
  * @apikey
 */
  async cancelOrder () {
    const { ctx, service } = this
    ctx.validate({
      order_id: 'string'
    }, ctx.query) 
    await service.student.cancelOrder(ctx.query.order_id)
    ctx.body = Message.success('操作成功')
  }
}


module.exports = StudentController;