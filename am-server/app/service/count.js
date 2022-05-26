/*
 * @Description:系统数据统计
 * @Author: zyj
 * @Date: 2021-12-14 15:02:28
 * @FilePath: /am/server/am-server/app/service/count.js
 * @LastEditTime: 2021-12-14 15:55:49
 * @LastEditors: zyj
 */
const { Service } = require('egg');
const BussinessError = require('../utils/BussinessError')

class CountService extends Service{

    //查询所有数量
    async countAll () {
       const { mysql } = this.app
       try {
        // sql1总数   sql2 在线设备数量  sql3 离线设备数量  sql4工程总数  sql5工单总数
        const sql1 = `select count(*) device_number from am_device where 1=1`
        const sql2 = `select count(*) online_number from am_device where online_status = 1`
        const sql3 = `select count(*) offline_number from am_device where online_status = 0`
        const sql4 = `select count(*) engineer_number from am_engineer`
        const sql5 = `select count(*) workorder_number from am_workorder where 1=1`
        
        const [{ device_number }] = await mysql.query(sql1)
        const [{ online_number }] = await mysql.query(sql2)
        const [{ offline_number }] = await mysql.query(sql3)
        const [{ engineer_number }] = await mysql.query(sql4)
        const [{ workorder_number }] = await mysql.query(sql5)

        return [
          { type: '设备总数', value: device_number },
          { type: '在线设备数', value: online_number },
          { type: '离线设备数', value: offline_number },
          { type: '工程总数', value: engineer_number },
          { type: '工单总数', value: workorder_number },
        ]
      } catch (error) {
        throw error
      }

    }
}

module.exports = CountService
