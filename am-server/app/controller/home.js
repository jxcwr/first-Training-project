/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-09-02 09:16:13
 * @LastEditors: charles
 * @LastEditTime: 2021-09-02 23:04:16
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
