
/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-09-02 09:16:13
 * @LastEditors: zyj
 * @LastEditTime: 2021-12-08 17:22:21
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc'
  }
};

