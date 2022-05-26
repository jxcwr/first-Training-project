/*
 * @Author: HeAo
 * @Date: 2021-12-03 10:50:16
 * @LastEditTime: 2021-12-15 09:15:08
 * @LastEditors: charles
 * @Description:
 * @FilePath: /am/server/am-server/app/service/config.js
 */
const { Service } = require('egg')
const BusinessError = require('../utils/BussinessError')

class ConfigService extends Service {

  //查询配置信息
  async findAll () {
    const { mysql } = this.app
    const configs = await mysql.select('base_config')
    return configs
  }

  //添加或修改配置信息
  async saveOrUpdate (reqData) {
    const { mysql } = this.app
    try {
      if (reqData.id) {
        await mysql.update('base_config', reqData)
      } else {
        await mysql.insert('base_config', reqData)
      }
    } catch (error) {
      throw new BusinessError('操作失败')
    }

  }

  //根据name查询配置详细信息
  async findByName (name) {
    const { mysql } = this.app
    const config = await mysql.select('base_config', {
      where:{ name }
    })
      return{
        config
      }
  }
  
  // 根据ID删除配置信息
   async deleteById (id) {
    const { mysql } = this.app
    try {
      await mysql.delete('base_config', { id })
    } catch (error) {
      throw new BusinessError('删除失败')
    }
  }



}

module.exports = ConfigService
