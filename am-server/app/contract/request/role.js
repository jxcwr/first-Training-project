/*
 * @Author: HeAo
 * @Date: 2021-12-02 10:05:41
 * @LastEditTime: 2021-12-02 10:08:37
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\contract\request\role.js
 */

module.exports = {
  roleReqData: {       // 模型名字
    id: {            // 字段名字
      type: 'string',  // 数据类型
      example: '1' // 案例
    },
    name: {            // 字段名字
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '管理员' // 案例
    }
  },
}
