/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-09-02 23:21:43
 * @LastEditors: HeAo
 * @LastEditTime: 2021-12-10 15:01:57
 */
const { Controller } = require('egg');
const Message = require('../utils/Message')

/**
 * @Controller user-controller:用户相关接口
*/

class UserController extends Controller {
  /**
   * @Router post /user/register
   * @summary 注册账号
   * @request body registerVM
  */

  async register () {
    const { ctx, service } = this
    const reqData = {
      ...ctx.request.body,
      status: '正常',
      register_time: new Date().getTime()
    }
    await service.user.register(reqData)

    ctx.body = Message.success('注册成功')
  }

  /**
   * @Router post /user/login
   * @summary 登录
   * @description 身份认证
   * @request body loginRequest
  */

  async login () {
    const { ctx, app, service } = this;
    const data = ctx.request.body;
    // 获取用户名密码，判断用户身份
    await service.user.login(data)

    const token = app.jwt.sign({ username: data.username, }, app.config.jwt.secret, {
      expiresIn: '604700s',
    });

    ctx.body = Message.success({
      token: `Bearer ${token}`
    });
  }

  /**
   * @Router get /user/getInfo
   * @summary 获取用户信息
   * @description 获取用户信息
   * @apikey
  */

  async getInfo () {
    const { ctx, app, service, config } = this
    // 截取token，将前面的Bearer 去掉
    const token = ctx.header.authorization.substring(7)
    // 验证token，反编译获取username
    const { username } = app.jwt.verify(token, config.jwt.secret)
    // 调用service，根据username获取info
    const info = await service.user.getInfo(username)

    // 给出响应
    ctx.body = Message.success(info)
  }

  /**
   * @Router get /user/logout
   * @summary 退出
   * @apikey
  */

  async logout () {
    const { ctx } = this
    ctx.body = Message.success('退出成功')
  }

  /**
   * @Router get /user/setRole
   * @summary 设置角色
   * @request query string *userId
   * @request query string *roleId
   * @apikey
  */

  async setRole () {
    const { ctx, service } = this
    const reqData = {
      id: ctx.query.userId,
      role_id: ctx.query.roleId
    }
    await service.user.setRole(reqData)

    ctx.body = Message.success('设置成功')
  }

  /**
   * @Router get /user/findAll
   * @summary 获取所有用户信息
   * @apikey
  */

  async findAll () {
    const { ctx, service } = this
    const users = await service.user.findAll()

    ctx.body = Message.success(users)
  }

  /**
   * @Router get /user/pageQuery
   * @summary 分页查询用户信息
   * @request query string *page
   * @request query string *pageSize
   * @request query string role_id
   * @apikey
  */

  async pageQuery () {
    const { ctx, service } = this
    const usersVM = await service.user.pageQuery(ctx.query)

    ctx.body = Message.success(usersVM)
  }

  /**
   * @Router post /user/saveOrUpdate
   * @summary 保存或更新
   * @description username, password为必须提供字段
   * @request body userReqData
   * @apikey
  */
  async saveOrUpdate () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      username: 'string',
      password: 'string',
    })
    // 调用service
    await service.user.saveOrUpdate(ctx.request.body)
    // 给出响应
    ctx.body = Message.success('操作成功')
  }

  /**
   * @Router delete /user/deleteById
   * @summary 根据id删除用户信息
   * @request query string *id 用户id
   * @apikey
  */

  async deleteById () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string'
    }, ctx.query)
    await service.user.deleteById(ctx.query.id)

    ctx.body = Message.success('删除成功')
  }

  /**
   * @Router patch /user/updateUserFace
   * @summary 修改用户头像
   * @request body userFace
   * @apikey
  */
  async updateUserFace () {
    const { ctx, service } = this
    ctx.validate({
      id: 'string',
      user_face: 'string'
    })
    await service.user.updateUserFace(ctx.request.body)

    ctx.body = Message.success('修改成功')
  }
}

module.exports = UserController;