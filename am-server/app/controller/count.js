/*
 * @Description: 
 * @Author: zyj
 * @Date: 2021-12-14 15:17:51
 * @FilePath: /am/server/am-server/app/controller/count.js
 * @LastEditTime: 2021-12-14 15:36:44
 * @LastEditors: zyj
 */
const { Controller } = require('egg');
const Message = require('../utils/Message')

/**
 * @Controller count-controller:首页统计总数相关接口
*/

class CountController extends Controller {
/**
   * @Router get /count/countAll
   * @summary 获取系统统计总数
   * @apikey
*/


   async countAll(){
    const { ctx, service } = this
    const counts = await service.count.countAll()

    ctx.body = Message.success(counts)




   }


}




module.exports = CountController;
