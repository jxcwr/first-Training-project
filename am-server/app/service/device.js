/*
 * @Author: HeAo
 * @Date: 2021-12-03 15:38:16
 * @LastEditTime: 2021-12-10 15:07:52
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\service\device.js
 */
const { Service } = require('egg')
const BussinessError = require('../utils/BussinessError')
const dateCreate = require('../utils/DataCreate')

class DeviceService extends Service {
  // 添加或修改设备信息
  async saveOrUpdate (reqData) {
    const { mysql } = this.app
    try {
      if (reqData.id) {
        await mysql.update('am_device', reqData)
      } else {
        reqData = {
          ...reqData,
          bind_status: 0,
          online_status: 0,
          insert_time: new Date().getTime()
        }
        await mysql.insert('am_device', reqData)
      }
    } catch (error) {
      throw new BussinessError('操作失败')
    }
  }

  // 分页查询设备信息
  async pageQuery ({ page, pageSize, name, engineer_id, bind_status, online_status }) {
    const { mysql } = this.app
    // 过滤params，将空数据剔除
    let params = { engineer_id, bind_status, online_status }
    for (let k in params) {
      if (!params[k]) {
        delete params[k]
      }
    }

    // 获取检索后的设备数据
    let sql1 = `select * from am_device where 1=1`
    const keys = Object.keys(params)
    if (keys.length > 0) {
      keys.forEach(k => {
        sql1 += ` and ${k} = ${params[k]}`
      })
    }
    if (name) {
      sql1 += ` and name like '%${name}%'`
    }
    sql1 += ` order by insert_time desc limit ${(page - 1) * pageSize}, ${pageSize}`
    const devices = await mysql.query(sql1)

    // 自定义查询total的sql语句
    let sql = `select count(*) as total from am_device where 1=1`
    if (keys.length > 0) {
      keys.forEach(k => {
        sql += ` and ${k} = ${params[k]}`
      })
    }
    if (name) {
      sql += ` and name like '%${name}%'`
    }
    // 获取分页查询的数据条数
    const [{ total }] = await mysql.query(sql)
    // 返回
    return {
      page,
      pageSize,
      total,
      list: devices
    }
  }

  // 根据ID删除设备信息
  async deleteById (id) {
    const { mysql } = this.app
    try {
      await mysql.delete('am_device', { id })
    } catch (error) {
      throw new BussinessError('删除失败')
    }
  }

  // 开启设备
  async openDevice (id) {
    const { mysql } = this.app
    try {
      const { engineer_id } = await mysql.get('am_device', { id })
      if (engineer_id) {
        // 开启间歇调用，往数据表中插入数据
        const intervalId = setInterval(() => {
          // 模拟设备数据
          let row = {
            insert_time: new Date().getTime(),
            tsp: dateCreate(30, 70),
            pm10: dateCreate(70, 120),
            pm25: dateCreate(30, 80),
            noise: dateCreate(30, 70, 1),
            temperature: dateCreate(15, 25, 1),
            humidity: dateCreate(30, 70),
            wind_speed: dateCreate(1, 7),
            wind_direction: dateCreate(0, 360),
            engineer_id,
            device_id: id
          }
          mysql.insert('am_monitor', row)
        }, 60000)
        // 拿到定时器的id
        const timer = intervalId[Symbol.toPrimitive]()

        // 修改设备的在线状态，并将timer的id存到表中
        await mysql.update('am_device', {
          id,
          online_status: 1,
          timer
        })
      } else {
        throw new BussinessError('设备未绑定', 501)
      }
    } catch (error) {
      throw error
    }
  }

  // 关闭设备
  async closeDevice (id) {
    const { mysql } = this.app
    try {
      // 关闭数据模拟器
      const { timer } = await mysql.get('am_device', { id })
      clearInterval(timer)
      // 修改设备的在线状态
      await mysql.update('am_device', {
        id,
        online_status: 0,
        timer: null
      })
    } catch (error) {
      throw new BussinessError('操作失败')
    }
  }

  // 根据id查询设备详情
  async findDeviceDetail (id) {
    const { mysql } = this.app
    try {
      const sql1 = `select * from am_device where id = ${id}`
      const [device] = await mysql.query(sql1)

      let detail = {}
      if (device.engineer_id) {
        const sql2 = `select * from am_engineer where id = ${device.engineer_id}`
        const [engineer] = await mysql.query(sql2)
        detail = {
          ...device,
          engineer
        }
      } else {
        detail = {
          ...device,
          engineer: null
        }
      }

      return detail
    } catch (error) {
      throw error
    }
  }
}

module.exports = DeviceService

