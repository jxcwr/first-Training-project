/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-09-01 09:58:01
 * @LastEditors: HeAo
 * @LastEditTime: 2021-12-02 11:49:30
 */

class Message {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().getTime();
  }

  static success (param) {
    if (typeof param == 'string') {
      return new Message(200, param, null)
    } else if (typeof param == 'object') {
      return new Message(200, 'success', param)
    }
  }

  static error (status, message) {
    return new Message(status, message, null);
  }
}


module.exports = Message;