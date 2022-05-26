/*
 * @Author: HeAo
 * @Date: 2021-12-08 16:38:45
 * @LastEditTime: 2021-12-21 22:14:59
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \am-server\app\service\dashboard.js
 * 别乱动！
 */
const { Service } = require("egg");
const BussinessError = require('../utils/BussinessError')
const moment = require('moment')

class DashboardService extends Service {
  // 设备在线、离线统计
  async queryDeviceOnlineNumber () {
    const { mysql } = this.app
    try {
      const sql1 = `select count(*) online_number from am_device where online_status = 1`
      const sql2 = `select count(*) offline_number from am_device where online_status = 0`
      const [{ online_number }] = await mysql.query(sql1)
      const [{ offline_number }] = await mysql.query(sql2)
      return [
        { type: '在线', value: online_number },
        { type: '离线', value: offline_number },
      ]
    } catch (error) {
      throw error
    }
  }

  // 统计工程使用的设备数量
  async queryEngineerBindDeviceNumber () {
    const { mysql } = this.app
    try {
      // let sql = `select e.name as type, count(*) as value
      // from am_engineer as e 
      // left join am_device as d on d.engineer_id = e.id 
      // group by e.name;`
      let engineers = await mysql.select('am_engineer')
      let devices = await mysql.select('am_device')
      let result = []
      engineers.forEach(engineer => {
        let arr = []
        let obj = {}
        devices.forEach(device => {
          if (device.engineer_id == engineer.id) {
            arr.push(device)
          }
        })
        obj = {
          type: engineer.name,
          value: arr.length
        }
        result.push(obj)
      })

      return result
    } catch (error) {
      throw error
    }
  }

  // 统计当月设备数据的平均数
  async queryMouthData ({ engineer_id, device_id, date }) {
    const { mysql } = this.app
    // 如果前端不提供date，默认为当月时间
    if (!date) {
      date = moment(new Date().getTime()).format('YYYY-MM')
    }
    let sql = `SELECT d,round(avg(tsp),1) tsp,round(avg(pm10),1) pm10,round(avg(pm25),1) pm25,round(avg(noise),1) noise,round(avg(temperature),1) temperature,round(avg(humidity),1) humidity,round(avg(wind_speed),1) wind_speed,round(avg(wind_direction),1) wind_direction
     FROM ((SELECT *,from_unixtime(FLOOR(insert_time/1000),'%Y-%m-%d') AS d FROM am_monitor where 1=1`
    if (engineer_id) {
      sql += ` and engineer_id = ${engineer_id}`
    }
    if (device_id) {
      sql += ` and device_id = ${device_id}`
    }

    sql += `) AS t) where d like '${date}%' group by d order by d desc;`


    const data = await mysql.query(sql)
    let result = []
    data.forEach(item => {
      for (let k in item) {
        let obj = {
          date: item.d,
          value: item[k],
          type: k
        }
        if (obj.value != item['d']) {
          result.push(obj)
        }
      }
    })

    return result
  }
  //查询城市空气质量数据
  async querycityPM () {
    const { mysql } = this.app
    const data = await mysql.select('am_city')
    return data
  }

    //查询各个月份空气质量数据
    async querymonthCG () {
      const { mysql } = this.app
      const data = await mysql.select('am_month')
      return data
    }
}




module.exports = DashboardService