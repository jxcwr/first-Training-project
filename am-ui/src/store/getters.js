/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-16 09:39:13
 * @LastEditors: charles
 * @LastEditTime: 2021-12-16 12:41:07
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes,
  config: state => state.app.config
}
export default getters
