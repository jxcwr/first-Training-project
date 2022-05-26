/*
 * @Author: HeAo
 * @Date: 2021-11-12 11:04:38
 * @LastEditTime: 2021-12-02 11:47:56
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\utils\BussinessError.js
 */
class BusinessError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}
module.exports = BusinessError
