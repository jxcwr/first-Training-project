/*
 * @Author: HeAo
 * @Date: 2021-12-03 10:50:16
 * @LastEditTime: 2021-12-14 09:47:32
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\service\engineer.js
 */
const { Service } = require('egg')
const BusinessError = require('../utils/BussinessError')

class EngineerService extends Service {
  // 添加或修改工程信息
  async saveOrUpdate (reqData) {
    const { mysql } = this.app
    try {
      if (reqData.id) {
        // 删除无用字段
        if (reqData.customer_name) {
          delete reqData.customer_name
        }
        if (reqData.customer_telephone) {
          delete reqData.customer_telephone
        }
        if (reqData.charge_name) {
          delete reqData.charge_name
        }

        await mysql.update('am_engineer', reqData)
      } else {
        // 获取客户角色的id
        const { id: role_id } = await mysql.get('base_role', { name: '客户' })
        // 获取客户信息，创建客户账号
        const customer = {
          username: reqData.customer_name,
          password: '123321',
          realname: reqData.customer_name,
          telephone: reqData.customer_telephone,
          role_id
        }
        const { insertId } = await this.service.user.saveOrUpdate(customer)
        // 创建工程
        delete reqData.customer_name
        delete reqData.customer_telephone
        reqData = {
          ...reqData,
          customer_id: insertId,
          status: '未绑定',
          create_time: new Date().getTime()
        }
        await mysql.insert('am_engineer', reqData)
      }
    } catch (error) {
      throw new BusinessError('操作失败')
    }
  }

  // 分页查询工程信息
  async pageQuery ({ page, pageSize, charge_id, customer_id }) {
    const { mysql } = this.app
    let params = { charge_id, customer_id }
    for (let k in params) {
      if (!params[k]) {
        delete params[k]
      }
    }
    // 分页查询工程信息
    let engineers = await mysql.select('am_engineer', {
      where: params,
      orders: [['create_time', 'desc']], // 排序方式
      limit: parseInt(pageSize), // 返回数据量
      offset: (page - 1) * pageSize, // 数据偏移量
    })
    engineers.forEach(engineer => {
      let charge_name = mysql.select('base_account', {
        where: { id: engineer.charge_id },
        columns: ['realname']
      })
      let customer = mysql.select('base_account', {
        where: { id: engineer.customer_id },
        columns: ['realname', 'telephone']
      })
      charge_name.then(res => {
        engineer.charge_name = res[0].realname
      })
      customer.then(res => {
        engineer.customer = res[0]
      })
    })
    // 自定义查询total的sql语句
    const sql = `select count(*) as total from am_engineer`
    // 获取分页查询的数据条数
    const [{ total }] = await mysql.query(sql)
    // 返回
    return {
      page,
      pageSize,
      total,
      list: engineers
    }
  }

  // 根据ID删除工程信息
  async deleteById (id) {
    const { mysql } = this.app
    try {
      await mysql.delete('am_engineer', { id })
    } catch (error) {
      throw error
    }
  }

  // 为工程绑定设备
  async bindService ({ engineer_id, device_id, latitude, longitude, video }) {
    const { mysql } = this.app
    // 先根据设备ID查询其是否被绑定，即判断设备的engineer_id是否为空，只能绑定状态为0(未绑定)状态的设备
    const device = await mysql.get('am_device', { id: device_id })
    if (device.engineer_id == null) {
      try {
        const row = {
          id: device_id,
          latitude,
          longitude,
          engineer_id,
          bind_status: 1,
          video
        }
        // 更新设备表 => engineer_id bind_status
        await mysql.update('am_device', row)
        // 更新工程表 => 工程状态
        await mysql.update('am_engineer', {
          id: engineer_id,
          status: '监测中'
        })
      } catch (error) {
        throw new BusinessError('绑定失败', 501)
      }

      try {
        // 绑定成功后，生成该设备的安装工单
        const installWorkOrder = {
          type: '安装',
          status: '待接单',
          create_time: new Date().getTime(),
          engineer_id,
          device_id
        }
        await this.service.workorder.saveOrUpdate(installWorkOrder)
      } catch (error) {
        throw new BusinessError('安装工单生成失败', 501)
      }
    } else {
      throw new BusinessError('该设备已被绑定', 501)
    }

  }

  // 结束工程
  async finish ({ id }) {
    const { mysql } = this.app
    const engineer_id = id
    try {
      const row = {
        id,
        status: '已结束',
        end_time: new Date().getTime()
      }
      await mysql.update('am_engineer', row)

      // 工程结束后，将其绑定的设备全部解绑
      // 先拿到所有绑定的设备id
      const ids = await mysql.select('am_device', {
        where: { engineer_id: id },
        columns: ['id']
      })
      // 遍历已绑定的所有设备，遍历解绑并生成对应拆机工单
      ids.forEach(({ id }) => {
        mysql.update('am_device', {
          id,
          bind_status: 0,
          engineer_id: null,
          online_status: 0,
          timer: null,
          latitude: null,
          longitude: null,
          video: null
        })
        // 结束成功后，生成设备的拆机工单
        const uninstallWorkOrder = {
          type: '拆机',
          status: '待接单',
          create_time: new Date().getTime(),
          engineer_id,
          device_id: id
        }
        this.service.workorder.saveOrUpdate(uninstallWorkOrder)
      })
    } catch (error) {
      throw new BusinessError('设备解绑失败', 501)
    }

    try {

    } catch (error) {
      throw new BusinessError('拆机工单生成失败', 501)
    }
  }

  // 查询所有工程设备树
  async findEngineerDeviceTree ({ charge_id, customer_id }) {
    const { mysql } = this.app
    let sql1 = `select id, name, latitude, longitude from am_engineer where 1=1`
    if (charge_id) {
      sql1 += ` and charge_id = ${charge_id}`
    }
    if (customer_id) {
      sql1 += ` and customer_id = ${customer_id}`
    }
    const sql2 = `select id, name, latitude, longitude, engineer_id, video, online_status, engineer_id from am_device`
    let engArr = await mysql.query(sql1)
    let devArr = await mysql.query(sql2)
    engArr.forEach(item => {
      item.children = []
      item.position = [item.latitude, item.longitude]
      delete item['latitude']
      delete item['longitude']
      devArr.forEach(i => {
        if (i.engineer_id == item.id) {
          let obj = {
            id: i.id,
            name: i.name,
            position: [i.latitude, i.longitude],
            video: i.video,
            online_status: i.online_status,
            engineer_id: i.engineer_id
          }
          item.children.push(obj)
        }
      })
    })
    return engArr
  }

  // 解绑单个设备
  async unbindDevice ({ engineer_id, device_id }) {
    const { mysql } = this.app

    try {
      // 获取设备的数据模拟器timer
      const { timer } = await mysql.get('am_device', { id: device_id })
      if (timer) {
        clearInterval(timer)
      }

      // 修改设备状态信息
      await mysql.update('am_device', {
        id: device_id,
        engineer_id: null,
        bind_status: 0,
        online_status: 0,
        timer: null,
        latitude: null,
        longitude: null,
        video: null
      })
    } catch (error) {
      throw new BusinessError('拆解失败', 501)
    }

    try {
      // 生成拆机工单
      const workOrder = {
        type: '拆机',
        status: '待接单',
        create_time: new Date().getTime(),
        engineer_id,
        device_id
      }
      await this.service.workorder.saveOrUpdate(workOrder)
    } catch (error) {
      throw new BusinessError('拆机工单生成失败', 501)
    }
  }
}

module.exports = EngineerService
