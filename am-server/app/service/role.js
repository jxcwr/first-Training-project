/*
 * @Author: HeAo
 * @Date: 2021-12-02 09:46:24
 * @LastEditTime: 2021-12-09 10:04:10
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\service\role.js
 */

const { Service } = require('egg')
const BussinessError = require('../utils/BussinessError')

class RoleService extends Service {
  // 查询所有角色
  async findAll () {
    const { mysql } = this.app
    const roles = await mysql.select('base_role')
    return roles
  }

  // 保存或更新角色
  async saveOrUpdate (row) {
    const { mysql } = this.app
    if (row.id) {
      await mysql.update('base_role', row)
    } else {
      await mysql.insert('base_role', row)
    }
  }

  // 为角色设置权限
  async setPrivilege ({ role_id, privileges }) {
    const { mysql } = this.app
    try {
      await mysql.delete('base_role_privilege', { role_id })
      privileges.forEach(item => {
        const row = {
          role_id,
          privilege_id: item
        }
        mysql.insert('base_role_privilege', row)
      })
    } catch (error) {
      throw error
    }
  }

  // 根据角色ID查询所属权限
  async findPrivilegesById (id) {
    const { mysql } = this.app
    try {
      const sql = `select p.* from base_role_privilege as rp, base_privilege as p where rp.role_id = ${id} and rp.privilege_id = p.id`
      const privileges = await mysql.query(sql)
      return privileges
    } catch (error) {
      throw new BussinessError('查询失败')
    }
  }

  // 根据ID删除角色
  async deleteById (id) {
    const { mysql } = this.app
    try {
      await mysql.delete('base_role', { id })
    } catch (error) {
      throw new BussinessError('删除失败')
    }
  }
}

module.exports = RoleService
