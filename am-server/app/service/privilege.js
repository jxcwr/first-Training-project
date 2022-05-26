/*
 * @Author: HeAo
 * @Date: 2021-12-02 10:18:23
 * @LastEditTime: 2021-12-10 15:45:33
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\service\privilege.js
 */
const { Service } = require('egg')
const BussinessError = require('../utils/BussinessError')

class PrivilegeService extends Service {
  // 保存或更新权限信息
  async saveOrUpdate (row) {
    const { mysql } = this.app
    if (row.id) {
      await mysql.update('base_privilege', row)
    } else {
      await mysql.insert('base_privilege', row)
    }
  }

  // 查询权限树
  async findPrivilegeTree () {
    const { mysql } = this.app

    // 查询所有权限
    const routes = await mysql.select('base_privilege', {
      orders: [['num', 'desc']]
    })
    // 过滤出一级路由对应的权限
    const levelOneRoute = routes.filter(item => item.parent_id == null)
    // 过滤出二级路由对应的权限
    const levelTwoRoute = routes.filter(item => item.parent_id != null)

    // 将二级路由对象push进对应一级路由的children中，通过判断一级路由的id = 二级路由的parent_id
    levelOneRoute.forEach(item => {
      let children = []
      levelTwoRoute.forEach(i => {
        if (i.parent_id == item.id) {
          children.push(i)
          item.children = children
        }
      })
    })

    return levelOneRoute
  }

  // 根据ID删除权限信息
  async deleteById (id) {
    const { mysql } = this.app
    try {
      await mysql.delete('base_privilege', { id })
    } catch (error) {
      throw new BussinessError('删除失败')
    }
  }
}

module.exports = PrivilegeService
