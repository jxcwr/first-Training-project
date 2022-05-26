/*
 * @Description: 统一异常处理
 * @Author: charles
 * @Date: 2021-09-02 21:06:25
 * @LastEditors: HeAo
 * @LastEditTime: 2021-12-07 14:16:46
 */
let Message = require('../utils/Message');
module.exports = () => {
  return async function errorHandler (ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 ? 'Internal Server Error' : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = Message.error(status, error);
      if (status === 422) {
        ctx.body.data = err.errors;
      }
      ctx.status = status;
    }
  };
};