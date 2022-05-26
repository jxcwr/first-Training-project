/*
 * @Description: 
 * @Author: zyj
 * @Date: 2021-12-06 14:51:22
 * @FilePath: /am/server/am-server/app/service/workorder.js
 * @LastEditTime: 2021-12-13 16:29:54
 * @LastEditors: zyj
 * @FilePath: \am-server\app\service\workorder.js
 * @LastEditTime: 2021-12-10 16:58:38
 * @LastEditors: HeAo
 * @FilePath: \am-server\app\service\workorder.js
 * @LastEditTime: 2021-12-09 15:51:05
 * @LastEditors: HeAo
*/
const { Service } = require('egg')
const { mysql } = require('../../config/plugin')
const BusinessError = require('../utils/BussinessError')

class WorkOrderService extends Service {


  // 分页查询工单信息
  // async pageQuery ({ page,pageSize,status,type,engineer_id,device_id,account_id,photo1,photo2,photo3 }) {
  //   const { mysql } = this.app
  //   //多条件 
  //   let queryParams = {status,type,engineer_id,device_id,account_id,photo1,photo2,photo3}
  //   for(let k in queryParams){
  //       if(!queryParams[k]){
  //             delete queryParams[k]
  //       }
  //   }
  //   // 分页查询工单信息
  //   const orders = await mysql.select('am_workorder', {
  //     where: queryParams,
  //     limit: parseInt(pageSize), // 返回数据量
  //     offset: (page - 1) * pageSize, // 数据偏移量
  //   })
  //   // 自定义查询total的sql语句
  //   const sql = `select count(*) as total from am_workorder`
  //   // 获取分页查询的数据条数
  //   const [{ total }] = await mysql.query(sql)
  //   // 返回
  //   return {
  //     page,
  //     pageSize,
  //     total,
  //     list: orders
  //   }
  // }

  // 多条件检索工单信息
  // async pageQuery ({ page, pageSize, engineer_id, device_id, status, type, account_id }) {
  //   const { mysql } = this.app
  //   let params1 = { engineer_id, device_id, status, type, account_id } 
  //   let params2 = { create_time, finish_time }
  //   // 遍历查询条件，将空值删除掉
  //   for (let k in params1) {
  //     if (!params1[k]) {
  //       delete params1[k]
  //     }
  //   }
  //   // 遍历查询条件，将空值删除掉
  //   // for (let k in params2) {
  //   //   if (!params2[k]) {
  //   //     delete params2[k]
  //   //   }
  //   // }

  //   // 检索数据
  //   let sql1 = `select count(*) as total from am_workorder`
  //   const keys1 = Object.keys(params1)
  //   // const keys2 = Object.keys(params2)
  //   if (keys1.length > 0) {
  //     if (keys1.length == 1) {
  //       sql1 += ` where ${keys1[0]} = '${params1[keys1[0]]}'`
  //     } else {
  //       for (let i = 1; i < keys1.length; i++) {
  //         sql1 += ` where ${keys1[0]} = '${params1[keys1[0]]}''`
  //         sql1 += ` and ${keys1[i]} = '${params1[keys1[i]]}'`
  //       }
  //     }
  //   }
  //   // if (keys2.length == 2) {
  //   //   sql1 += ` and insert_time between ${create_time} and ${finish_time}`
  //   // }
  //   // sql1 += ` limit ${(page - 1) * pageSize}, ${pageSize}`
  //   const data = await mysql.select('am_workorder',{
  //     where: params1,
  //     limit: parseInt(pageSize),//返回数据量
  //     offset: (page - 1) * pageSize,//数据偏移量
  //   })

  //   // 查询total
  //   // const sql2 = ` select count(*) as total from am_workorder`

  //   const [{ total }] = await mysql.query(sql1)

  //   return {
  //     page,
  //     pageSize,
  //     total,
  //     list: data
  //   }
  // }

  async pageQuery ({ page, pageSize, engineer_id, device_id, status, type, account_id, begin_time, end_time }) {
    const { mysql } = this.app
    // 检索数据
    let sql1 = `select count(*) as total from am_workorder as w where 1=1 `
    // let sql2 = `select * from am_workorder where 1=1 `
    let sql2 = `select w.*, e.name as engineer_name, d.name as device_name, a.realname as account_name
    from am_workorder as w 
    left join am_engineer e
     on w.engineer_id = e.id
    left join am_device d on w.device_id = d.id
    left join base_account a on w.account_id = a.id where 1=1`

    if (engineer_id) {
      sql1 += ` and w.engineer_id = ${engineer_id}`
      sql2 += ` and w.engineer_id = ${engineer_id}`
    }
    if (device_id) {
      sql1 += ` and w.device_id = ${device_id}`
      sql2 += ` and w.device_id = ${device_id}`
    }
    if (status) {
      sql1 += ` and w.status = '${status}'`
      sql2 += ` and w.status = '${status}'`
    }
    if (type) {
      sql1 += ` and w.type = '${type}'`
      sql2 += ` and w.type = '${type}'`
    }
    if (account_id) {
      sql1 += ` and w.account_id = ${account_id}`
      sql2 += ` and w.account_id = ${account_id}`
    }
    if (begin_time && end_time) {
      sql1 += ` and w.create_time between ${begin_time} and ${end_time}`
      sql2 += ` and w.create_time between ${begin_time} and ${end_time}`
    }
    sql2 += ` ORDER BY w.create_time DESC limit ${(page - 1) * pageSize}, ${pageSize}`

    //total
    const data = await mysql.query(sql2)
    const [{ total }] = await mysql.query(sql1)
    
    data.forEach(item => {
      item.begin_photos = [
        item.p1,
        item.p2,
        item.p3
      ]
      delete item.p1
      delete item.p2
      delete item.p3
      //将开始照片中的p1,p2,p3为空时的情况过滤出来删掉
      // item.begin_photos = item.begin_photos.filter(item => item != null)
      // 增加 item.null 和 “”限制， 解决当数据库数据被删除时，分页查询工单开始和结束照片数组中值变为"" bug
      item.begin_photos = item.begin_photos.filter(item => (item !== null) && (item !== ""))

      item.end_photos = [
        item.photo1,
        item.photo2,
        item.photo3
      ]
      delete item.photo1
      delete item.photo2
      delete item.photo3
      //将结束照片中的photo1,photo2,photo3为空时情况过滤出来删掉

      // item.end_photos = item.end_photos.filter(item => item != null)
      item.end_photos = item.end_photos.filter(item => (item !== null) && (item !== ""))

    });
    return {
      page,
      pageSize,
      total,
      list: data
    }
  }


  //添加或修改工单信息
  async saveOrUpdate (reqData) {
    const { mysql } = this.app

    try {
      if (reqData.id) {
        await mysql.update('am_workorder', reqData)
      } else {
        // console.log(reqData)
        await mysql.insert('am_workorder', reqData)
      }
    } catch (error) {
      throw new BusinessError('操作失败')
    }
  }


  //根据ID删除工单信息
  async deleteById (id) {
    //解构出this.app中的的mysql属性，也就是this.app.mysql
    const { mysql } = this.app
    try {
      await mysql.delete('am_workorder', { id })
    } catch (error) {
      throw new BussinessError('删除失败')
    }
  }


  //根据ID查询工单详细信息
  async findById (id) {
    const { mysql } = this.app
    const order = await mysql.select('am_workorder', {
      where: { id }
    })
    return {
      order
    }
  }


  //报修工单
  //status,工程id,设备id, 后两个字段值从工程和设备接口拿数据传到本接口,状态改变为待接单，工程和设备id插入到am_workorder表中
  async repairOrder (reqData) {
    const { mysql } = this.app
    try {
      reqData = {
        ...reqData,
        status: '待接单',
        type: '维修',
        create_time: new Date().getTime(),
        account_id: 1
      }
      await mysql.insert('am_workorder', reqData)
    } catch (error) {
      throw new BusinessError('报修失败')
    }

  }

  //确认接单之后根据工单id将状态改为进行中
  async takeOrder (row) {
    const { mysql } = this.app
    try {
      await mysql.update('am_workorder', row)
    } catch {
      throw new BusinessError('操作失败')
    }

  }

  //进行中订单 完成后变为已完成
  async finishOrder (row) {
    const { mysql } = this.app
    try {
      await mysql.update('am_workorder', row)
    } catch {
      throw new BusinessError('操作失败')
    }
  }

  //待接单状态可取消工单
  async cancelOrder (id) {
    const { mysql } = this.app
    //根据ID查询工单详细信息
    const order = await mysql.get('am_workorder', { id })
    if (order.status == '待接单') {
      await mysql.delete('am_workorder', { id })
    } else {
      throw new BusinessError('进行中、已完成状态工单不可取消', 501)

    }
  }

}

module.exports = WorkOrderService



