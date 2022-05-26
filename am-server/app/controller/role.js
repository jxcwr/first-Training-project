/*
 * @Author: HeAo
 * @Date: 2021-12-02 09:46:30
 * @LastEditTime: 2021-12-02 17:13:20
 * @LastEditors: HeAo
 * @Description: 
 * @FilePath: \am-server\app\controller\role.js
 */
const { Controller } = require('egg')
const Message = require('../utils/Message')

/**
 * @Controller role-controller:角色相关接口
*/

class RoleController extends Controller {
  /**
   * @Router get /role/findAll
   * @summary 获取所有角色信息
   * @apikey
  */

  async findAll () {
    const { ctx, service } = this
    const roles = await service.role.findAll()

    ctx.body = Message.success(roles)
  }

  /**
   * @Router post /role/saveOrUpdate
   * @summary 保存或更新
   * @request body roleReqData
   * @apikey
  */

  async saveOrUpdate () {
    const { ctx, service } = this
    const reqData = ctx.request.body
    await service.role.saveOrUpdate(reqData)

    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router post /role/setPrivilege
   * @summary 为角色授权
   * @request body roleSetPrivilege
   * @apikey
  */

  async setPrivilege () {
    const { ctx, service } = this
    const reqData = ctx.request.body
    await service.role.setPrivilege(reqData)

    ctx.body = Message.success('授权成功')
  }

  /**
   * @Router get /role/findPrivilegesById
   * @summary 根据id查询角色拥有的权限
   * @request query string *id
   * @apikey
  */

  async findPrivilegesById () {
    const { ctx, service } = this
    const id = ctx.query.id
    const privileges = await service.role.findPrivilegesById(id)

    ctx.body = Message.success(privileges)
  }

  /**
   * @Router delete /role/deleteById
   * @summary 根据id删除角色信息
   * @request query string *id
   * @apikey
  */

  async deleteById () {
    const { ctx, service } = this
    const id = ctx.query.id
    await service.role.deleteById(id)

    ctx.body = Message.success('删除成功')
  }

}

module.exports = RoleController