/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-08 12:16:49
 * @LastEditors: charles
 * @LastEditTime: 2021-12-16 12:50:31
 */
// 动态路由
import request from '@/utils/request'
import Layout from '@/layout'
import {  construct } from '@aximario/json-tree'

async function parseMenu(id) {
  const response = await request.get('/role/findPrivilegesById?id=' + id)
  const privileges = construct(response.data, {
    id: 'id',
    pid: 'parent_id',
    children: 'children'
  })
  const routes = []
  for (const privilege of privileges)   {
    if (privilege.type === 'menu') {
      const route = {
        path: privilege.route,
        component: Layout,
        meta: { title: privilege.name, icon: privilege.icon },
        children: []
      }
      if (privilege.children && privilege.children.length > 0) {
        for (const p of privilege.children) {
          const son_route = {
            path: p.route,
            // component: () => import('@/pages'+p.route),
            component: function component(resolve) {
              require(['@/pages' + p.route], resolve)
            },
            name: p.route_name,
            meta: { title: p.name },
            hidden: p.hidden == 1
          }
          // console.log(son_route);
          // console.log(JSON.stringify(son_route))
          route.children.push(son_route);
        }
      }
      routes.push(route)
    }
  }
  routes.push({ path: '*', redirect: '/404', hidden: true })
  return routes
}
// let routes = parseMenu();

export default parseMenu

