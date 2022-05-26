/*
 * @Author: jxc
 * @Date: 2021-12-22 10:32:33
 * @LastEditTime: 2021-12-22 13:31:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \am\am-server\app\controller\canteen.js
 */
const { Controller } = require('egg');
const Message = require('../utils/Message')


/**
 * @Controller canteen-controller:餐厅相关接口
*/

class CanteenController extends Controller {

    /**
   * @Router post /canteen/register
   * @summary 注册餐厅账号
   * @description canteen_name, canteen_address为必须提供字段
   * @request body canteenRegisterVM
  */

     async register () {
      const { ctx, service } = this
      // 参数校验
      ctx.validate({
        canteen_name: 'string',
        canteen_address: 'string',
      })
      await service.canteen.register(ctx.request.body,ctx.request.body.canteen_name)
  
      ctx.body = Message.success('注册成功')
    }
      
  /**
   * @Router get /canteen/findAll
   * @summary 获取所有餐厅信息
   * @apikey
  */

   async findAll () {
    const { ctx, service } = this
    const canteens = await service.canteen.findAll()

    ctx.body = Message.success(canteens)
  }
  /**
   * @Router get /canteen/pageQuery
   * @summary 分页查询餐厅订单信息
   * @request query string *page
   * @request query string *pageSize
   * @apikey
  */

 async pageQuery () {
    const { ctx, service } = this
    const canteensVM = await service.canteen.pageQuery(ctx.query)

    ctx.body = Message.success(canteensVM)
  }
  
}


module.exports = CanteenController;