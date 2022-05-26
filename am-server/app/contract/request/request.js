/*
 * @Author: HeAo
 * @Date: 2021-12-01 15:41:44
 * @LastEditTime: 2021-12-22 10:45:34
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \am-server\app\contract\request\request.js
 */

module.exports = {
  // 登录请求数据模型
  loginRequest: {      // 模型名字
    username: {        // 字段名字
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: 'admin' // 案例
    },
    password: {
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '123321'// 案例
    },
  },
  // 注册请求数据模型
  registerVM: {      // 模型名字
    username: {        // 字段名字
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: 'lerry' // 案例
    },
    password: {
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '123321'// 案例
    }
  },
  // 用户添加数据模型
  userReqData: {
    username: {        // 字段名字
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: 'lerry' // 案例
    },
    password: {
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '123321'// 案例
    },
    realname: {
      type: 'string',  // 数据类型
      example: '李丽'// 案例
    },
    telephone: {
      type: 'string',  // 数据类型
      example: '13466457789'// 案例
    },
    birth: {
      type: 'number',  // 数据类型
      example: 1638501668835// 案例
    },
    gender: {
      type: 'string',  // 数据类型
      example: '男'      // 案例
    },
    user_face: {
      type: 'string',  // 数据类型
      example: 'http://xxx/xxx.jgp'// 案例
    }
  },

  //学生订单
    studentReqData: {
      id: {        // 字段名字
        type: 'number',  // 数据类型
        require: true,   // 是否为必须传递参数
        example: 10 // 案例
      },
      student_name: {
        type: 'string',  // 数据类型
        example: '晁文神'// 案例
      },
      telephone: {
        type: 'string',  // 数据类型
        example: '15193710145'// 案例
      },
      address: {
        type: 'string',  // 数据类型
        example: '11号楼120'// 案例
      },
      order_id: {
        type: 'string',  // 数据类型
        example: 'fouth-02'   // 案例
      }
    },

    //学生注册
  studentRegisterVM: {      // 模型名字
    id:{
      type: 'number',  // 数据类型
      example: '10'// 案例
    },
    username: {        // 字段名字
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '蛮王' // 案例
    },
    password: {
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '123321mw'// 案例
    },
    realname: {
      type: 'string',  // 数据类型
      example: '石大兴'// 案例
    },
    class: {
      type: 'string',  // 数据类型
      example: '21级'// 案例
    },
    gender: {
      type: 'string',  // 数据类型
      example: '男'// 案例
    }
  },
  //餐厅注册
  canteenRegisterVM: {      // 模型名字

    canteen_name: {        // 字段名字
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '漩涡鸣人餐厅' // 案例
    },
    canteen_address: {
      type: 'string',  // 数据类型
      require: true,   // 是否为必须传递参数
      example: '二食堂窗口5'// 案例
    }
  },
  userFace: {
    id: {
      type: 'string',
      require: true,
      example: '1'
    },
    user_face: {
      type: 'string',
      require: true,
      example: 'http://xxx/xxxx.jpg'
    }
  },
  // 添加修改权限数据模型
  privilegeReqData: {
    id: {
      type: 'string',
      example: '1'
    },
    name: {
      type: 'string',
      require: true,
      example: '用户管理'
    },
    description: {
      type: 'string',
      example: '用户的增删改查'
    },
    route: {
      type: 'string',
      require: true,
      example: '/admin/login'
    },
    route_name: {
      type: 'string',
      example: 'Login'
    },
    type: {
      type: 'string',
      require: true,
      example: 'menu'
    },
    icon: {
      type: 'string',
      example: 'icon_1'
    },
    hidden: {
      type: 'number',
      example: '1'
    },
    num: {
      type: 'number',
      example: '1'
    },
    parent_id: {
      type: 'number',
      example: '1'
    }
  },
  // 为角色授予权限数据模型
  roleSetPrivilege: {
    role_id: {
      type: 'number',
      example: '1'
    },
    privileges: {
      type: 'array',
      itemType: 'number',
      example: [1, 2, 3]
    }
  },
  // 添加修改工程信息数据模型
  engineerReqData: {
    id: {
      type: 'number',
      example: 1
    },
    serial_number: {
      type: 'string',
      example: 'GC-001'
    },
    name: {
      type: 'string',
      example: '昆山学院路浦东软件园市政工程'
    },
    address: {
      type: 'string',
      example: '江苏省苏州市昆山市巴城镇学院路828号'
    },
    type: {
      type: 'string',
      example: '写字楼'
    },
    latitude: {
      type: 'string',
      example: '120.84165569577029'
    },
    longitude: {
      type: 'string',
      example: '31.47080068567419'
    },
    charge_id: {
      type: 'number',
      example: 1
    },
    customer_name: {
      type: 'string',
      example: '张三'
    },
    customer_telephone: {
      type: 'string',
      example: "13465789988"
    }
  },
  // 添加修改设备数据模型
  deviceReqData: {
    id: {
      type: 'number',
      example: 1
    },
    name: {
      type: 'string',
      example: '空气质量检测一号设备'
    },
    serial_number: {
      type: 'string',
      example: 'DV-001'
    }
  }
}
