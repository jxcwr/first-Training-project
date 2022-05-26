/*
 * @Description: 
 * @Author: zyj
 * @Date: 2021-12-08 11:36:10
 * @FilePath: /am-svn/am/server/am-server/app/controller/config.js
 * @LastEditTime: 2021-12-08 15:32:52
 * @LastEditors: zyj
 */

const { Controller } = require('egg');
const Message = require('../utils/Message')

/**
 * @Controller config-controller:系统配置信息相关接口
*/

  class ConfigController extends Controller {

  /**
   * @Router get /config/findAll
   * @summary 获取所有系统配置信息
   * @apikey
  */
    async findAll () {
        const { ctx, service } = this
        const configs = await service.config.findAll()
    
        ctx.body = Message.success(configs)
    }


  /**
   * @Router post /config/saveOrUpdate
   * @summary 保存或更新
   * @description name, value 为必须提供字段,有id为更新操作，否则执行新增操作
   * @request body configReqData
   * @apikey
  */
   async saveOrUpdate () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      name: 'string',
      value: 'string'
    })
    // 调用service
    await service.config.saveOrUpdate(ctx.request.body)
    // 给出响应
    ctx.body = Message.success('操作成功')
  }

   /**
   * @Router get /config/findByName
   * @summary 根据name查询配置详情
   * @request query string *name
   * @apikey
  */
    async findByName () {
      const { ctx, service } = this
      ctx.validate({
        name: 'string'
      }, ctx.query)
      const res = await service.config.findByName(ctx.query.name)
      
      ctx.body = Message.success(res)   
    }
    
  /**
   * @Router delete /config/deleteById
   * @summary 根据id删除配置信息
   * @request query string *id 用户id
   * @apikey
  */
  async deleteById () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.config.deleteById(ctx.query.id)

    ctx.body = Message.success('删除成功')
  }


}


module.exports = ConfigController;
  