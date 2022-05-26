/*
 * @Author: HeAo
 * @Date: 2021-12-07 11:18:17
 * @LastEditTime: 2021-12-09 17:15:58
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\service\monitor.js
 */

const { Service } = require("egg");
const BussinessError = require('../utils/BussinessError')
const moment = require('moment')

class MonitorService extends Service {
  // 多条件检索设备数据
  async pageQuery ({ page, pageSize, engineer_id, device_id, begin_time, end_time }) {
    const { mysql } = this.app

    try {
      // 检索数据
      let sql1 = `select count(*) as total from am_monitor where 1=1`
      let sql2 = `select * from am_monitor where 1=1`
      if (engineer_id) {
        sql1 += ` and engineer_id = ${engineer_id}`
        sql2 += ` and engineer_id = ${engineer_id}`
      }
      if (device_id) {
        sql1 += ` and device_id = ${device_id}`
        sql2 += ` and device_id = ${device_id}`
      }
      if (begin_time && end_time) {
        sql1 += ` and insert_time between ${begin_time} and ${end_time}`
        sql2 += ` and insert_time between ${begin_time} and ${end_time}`
      }
      sql2 += ` order by insert_time desc limit ${(page - 1) * pageSize}, ${pageSize}`
      // 查询total
      const data = await mysql.query(sql2)
      const [{ total }] = await mysql.query(sql1)

      return {
        page,
        pageSize,
        total,
        list: data
      }
    } catch (error) {
      throw new BussinessError('检索失败', 501)
    }
  }

  async pageQueryTodayData ({ page, pageSize, engineer_id, device_id }) {
    const { mysql } = this.app
    const today = moment(new Date().getTime()).format('YYYY-MM-DD')
    // const sql = `SELECT * FROM ((SELECT *,from_unixtime(FLOOR(insert_time/1000)) AS d FROM am_monitor) AS t) where d LIKE '${today}%'`

    try {
      // 检索数据
      let sql1 = `SELECT * FROM ((SELECT *,from_unixtime(FLOOR(insert_time/1000)) AS d FROM am_monitor) AS t) where d LIKE '${today}%'`
      let sql2 = `SELECT count(*) as total FROM ((SELECT *,from_unixtime(FLOOR(insert_time/1000)) AS d FROM am_monitor) AS t) where d LIKE '${today}%'`
      if (engineer_id) {
        sql1 += ` and engineer_id = ${engineer_id}`
        sql2 += ` and engineer_id = ${engineer_id}`
      }
      if (device_id) {
        sql1 += ` and device_id = ${device_id}`
        sql2 += ` and device_id = ${device_id}`
      }

      sql1 += ` order by insert_time desc limit ${(page - 1) * pageSize}, ${pageSize}`
      // 查询total
      const data = await mysql.query(sql1)
      const [{ total }] = await mysql.query(sql2)

      return {
        page,
        pageSize,
        total,
        list: data
      }
    } catch (error) {
      throw new BussinessError('检索失败', 501)
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
    return data
  }
}

module.exports = MonitorService
