/*
 * @Description: 
 * @Author: charles
 * @Date: 2021-09-02 16:50:49
 * @LastEditors: charles
 * @LastEditTime: 2021-09-02 16:53:17
 */
class PageVM {
  constructor ( page,pageSize,total,list){
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.list = list;
  }
}

module.exports = PageVM;
