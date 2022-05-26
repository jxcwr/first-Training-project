/*
 * @Author: HeAo
 * @Date: 2021-12-06 15:44:38
 * @LastEditTime: 2021-12-06 15:54:34
 * @LastEditors: HeAo
 * @Description:
 * @FilePath: \am-server\app\utils\DataCreate.js
 */
module.exports = function dateCreate (startNumber, endNumber, num) {
  const choice = endNumber - startNumber + 1;
  if (num) {
    return Math.floor((Math.random() * choice + startNumber) * 10) / 10
  }
  return Math.floor(Math.random() * choice + startNumber)
}

