/*
 * @Author: jxc
 * @Date: 2021-12-17 17:18:22
 * @LastEditTime: 2021-12-22 10:40:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \am\am-server\app\service\student.js
 */
const { Service } = require('egg')
const BussinessError = require('../utils/BussinessError')

class StudentService extends Service {

    //注册学生账号
    async register (data,username) {
      const { mysql } = this.app
      let sqlName = await mysql.get('student_user', { username })
      if (sqlName) {  //看数据库有没有这个username，有的话抛出异常
        throw new BussinessError('该用户已经存在', 401)
       } else {
        await mysql.insert('student_user', data)  //插入注册的数据
      }
    }
  
    // 查询所有学生用户
    async findAll () {
      const { mysql } = this.app
      const students = await mysql.select('student_user')
      return students
    }

    // 分页学生订单信息
  async pageQuery ({ page, pageSize }) {
    const { mysql } = this.app
    let sql1 = `select * from student_order limit ${(page - 1) * pageSize},${pageSize}`
    const students = await mysql.query(sql1)

    // 自定义查询total的sql语句
    const sql = `select count(*) as total from student_order`
    // 获取分页查询的数据条数
    const [{ total }] = await mysql.query(sql)
    // 返回
    return {
      page,
      pageSize,
      total,
      list: students
    }
  }
    // 添加或修改学生订单信息
    async saveOrUpdate (row) {
      const { mysql } = this.app
      try {
        if (row.id) {
          // let sql = "update xxx set xx = xx where student_id = "+row.student_id;
          // await mysql.query(sql)

          await mysql.update('student_order', row)
        } else {
          await mysql.insert('student_order', row)
        }
      } catch (error) {
        console.log(error);
        throw new BussinessError('操作失败')
      }
  
    }
    // 查询所有学生订单信息
    async findAllorder () {
      const { mysql } = this.app
      const orders = await mysql.select('student_order')
      return orders
    }


    //学生根据订单id删除订单
    async cancelOrder (order_id) {
      const { mysql } = this.app
      //根据order_id查询学生订单详细信息
      let accountInfo = await mysql.get('student_order', { order_id })
      if (accountInfo) {
        await mysql.delete('student_order', { order_id })   //删除学生订单
        await mysql.delete('canteen_order', { order_id })   //删除餐厅订单
      } else {
        throw new BussinessError('订单不存在', 401)
  
      }
  }
}

module.exports = StudentService