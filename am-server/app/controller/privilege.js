/*
 * @Author: HeAo
 * @Date: 2021-12-02 10:12:49
 * @LastEditTime: 2021-12-02 17:13:19
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\controller\privilege.js
 */
const { Controller } = require('egg')
const Message = require('../utils/Message')

/**
 * @Controller privilege-controller:权限相关接口
*/

class PrivilegeController extends Controller {
  /**
   * @Router post /privilege/saveOrUpdate
   * @summary 保存或更新
   * @description name,route,type为必须提供字段
   * @request body privilegeReqData
   * @apikey
  */

  async saveOrUpdate () {
    const { ctx, service } = this
    await service.privilege.saveOrUpdate(ctx.request.body)

    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router get /privilege/findPrivilegeTree
   * @summary 获取权限树
   * @apikey
  */

  async findPrivilegeTree () {
    const { ctx, service } = this
    const tree = await service.privilege.findPrivilegeTree()

    ctx.body = Message.success(tree)
  }

  /**
   * @Router delete /privilege/deleteById
   * @summary 根据id删除权限信息
   * @request query string *id
   * @apikey
  */

  async deleteById () {
    const { ctx, service } = this
    const id = ctx.query.id
    await service.privilege.deleteById(id)

    ctx.body = Message.success('删除成功')
  }
}

module.exports = PrivilegeController
