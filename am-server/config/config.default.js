/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-09-02 09:16:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-16 18:09:11
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630545364793_1663';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    jwt: {
      secret: "888888"
    },
    security: {
      csrf: {
        enable: false
      }
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    mysql: {
      // 单数据库信息配置
      client: {
        port: '3306',
        host: '8.130.9.227',
        user: 'root',
        password: '727577@jxc',
        database: 'we'
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    swaggerdoc: {
      dirScanner: "./app/controller",  // 配置自动扫描的控制器路径
      // basePath: 'http://127.0.0.1:7001',
      apiInfo: {
        title: "Briup-智慧城市环境监测系统",     // 接口文档标题
        description: "智慧城市环境监测系统接口文档", // 接口文档描述
        version: "1.0.0",              // 接口文档版本
      },
      schemes: ["http", "https"],      // 配置支持的协议
      consumes: ["application/json"],  // 指定处理请求的提交内容类型(Content-Type)
      produces: ["application/json"],  // 指定返回的内容类型
      securityDefinitions: {           // Authorization认证
        apikey: {
          description: 'Authorization format: Bearer {token}',  // 认证示例描述
          type: 'apiKey',              // 认证类型
          name: 'Authorization',       // 认证字段
          in: 'header'                 // 认证添加至请求头
        }
      },
      enableSecurity: true,           // 是否启用授权（默认false不启用）
      enableValidate: true,           // 是否启动参数校验（默认true开启）
      routerMap: false,               // 是否自动生成路由（默认true开启）
      enable: true,

    },
    // cluster: {
    //   listen: {
    //     port: 7002
    //   }
    // }
  };

  return {
    ...config,
    ...userConfig,
  };
};
