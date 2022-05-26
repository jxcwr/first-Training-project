/*
 * @Author: HeAo
 * @Date: 2021-12-01 15:25:24
 * @LastEditTime: 2021-12-10 17:21:58
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\service\user.js
 */

const { Service } = require('egg')
const BussinessError = require('../utils/BussinessError')



class UserService extends Service {
  async login ({ username, password }) {
    const { mysql } = this.app
    let accountInfo = await mysql.get('base_account', { username })
    // 第一步判断数据库中是否有该用户
    if (accountInfo) {
      // 第二步判断用户输入的密码是否与数据库中保存的一致
      if (accountInfo.password == password) {
        // 都判断成功，则返回该查询对象
        return accountInfo
      } else {
        throw new BussinessError('密码错误', 401)
      }
    } else {
      throw new BussinessError('该用户不存在', 401)
    }
  }

  async getInfo (username) {
    const { mysql } = this.app
    const info = await mysql.get('base_account', { username })
    return info
  }

  async register (data) {
    const { mysql } = this.app
    await mysql.insert('base_account', data)
  }

  async setRole (row) {
    const { mysql } = this.app
    await mysql.update('base_account', row)
  }

  // 查询所有用户
  async findAll () {
    const { mysql } = this.app
    const users = await mysql.select('base_account')
    return users
  }

  // 分页查询用户信息
  async pageQuery ({ page, pageSize, role_id }) {
    const { mysql } = this.app
    let sql1 = `select a.*, r.name as roleName from base_account as a left join base_role as r on a.role_id = r.id limit ${(page - 1) * pageSize},${pageSize}`
    if (role_id) {
      sql1 = `select a.*, r.name as roleName from base_account as a left join base_role as r on a.role_id = r.id where a.role_id = ${role_id} limit ${(page - 1) * pageSize},${pageSize}`
    }
    const users = await mysql.query(sql1)

    // 自定义查询total的sql语句
    const sql = `select count(*) as total from base_account`
    // 获取分页查询的数据条数
    const [{ total }] = await mysql.query(sql)
    // 返回
    return {
      page,
      pageSize,
      total,
      list: users
    }
  }

  // 添加或修改用户信息
  async saveOrUpdate (row) {
    const { mysql } = this.app
    try {
      if (row.id) {
        await mysql.update('base_account', row)
      } else {
        row = {
          ...row,
          status: '正常',
          register_time: new Date().getTime()
        }
        const result = await mysql.insert('base_account', row)
        return result
      }
    } catch (error) {
      throw new BussinessError('操作失败')
    }

  }

  // 根据ID删除用户
  async deleteById (id) {
    const { mysql } = this.app
    try {
      await mysql.delete('base_account', { id })
    } catch (error) {
      throw new BussinessError('删除失败')
    }
  }

  // 修改用户头像
  async updateUserFace (reqData) {
    const { mysql } = this.app
    try {
      await mysql.update('base_account', reqData)
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService
