/*
 * @Description: 
 * @Author: zyj
 * @Date: 2021-12-06 15:52:37
 * @FilePath: /am-svn/am/server/am-server/app/contract/request/workorder.js
 * @LastEditTime: 2021-12-10 16:39:56
 * @LastEditors: zyj
 */
module.exports = {
    //添加修改工单信息
    workOrderData: {
        id: {
          type: 'number',
          example: 1
        },
        status: {
          type: 'string',
          example: '待接单'
        },
        type:{
           type: 'string',
           example: '安装'
        },
        create_time: {
          type: 'string',
          example: '1638759282576'
        },
        engineer_id: {
          type: 'number',
          example: 1
        },
        device_id: {
          type: 'number',
          example: 1
        },
        photo1:{
          type: 'string',
          example:''
        },
        photo2:{
          type: 'string',
          example:''
        },
        photo3:{
          type: 'string',
          example:''
        },
        p1:{
          type: 'string',
          example:''
        },
        p2:{
          type: 'string',
          example:''
        },
        p3:{
          type: 'string',
          example:''
        }
    },

    //报修信息
    repairOrderData: {
      engineer_id: {
        type: 'number',
        example: 1
      },
      device_id: {
        type: 'number',
        example: 1
      },
      account_id:{
        type: 'number',
        example: 1
      },
      bill_why: {
        type: 'string',
        example: '报修原因描述'
      },
      p1:{
        type: 'string',
        example:''
      },
      p2:{
        type: 'string',
        example:''
      },
      p3:{
        type: 'string',
        example:''
      }
      
     
    },

    //配置信息
    configReqData:{
      id: {
        type: 'number',
        example: 1
      },
      name: {
        type: 'string',
        example: 'licy'
      },
      value: {
        type: 'string',
        example: "http://url"
      },
      introduce:{
        type: 'string',
        example: "系统logo"
      },
    },

    //接单请求
    takeOrderData:{
      id: {
        type: 'string',
        example: '1'
      },
      account_id: {
        type: 'string',
        example: '1'
      },
    }

    
}
