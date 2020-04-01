import {API_ROOT} from '../config'
const url = "http://192.168.0.171:8080";  //客户地址
// const url = "http://139.199.119.231:8080";  //服务器地址

const rootPath = API_ROOT + '/spr-orders/'   
const API = {
  getManageLogin: url + '/api/management/identification',
  getExit: url + '/api/management/identification', // 退出登录
  getAdduser: url + '/api/management/user',   // 新增考生
  getUserList: url + '/api/management/user', // 查询考生信息列表
  getWorkType: url + '/api/management/workType', // 查询作业类型列表
  getWorkProject: url + '/api/management/workProject', // 查询作业项目
  getLogin: url + '/api/test/', // 考生登录获取题
  getCommit: url + '/api/test/commit', // 提交试卷
  getHeadFile: url + '/api/management/uploadFile', // 上传头像
  getUpdate: url + '/api/management/user_update', // 修改考生信息
  getDelete: url + '/api/management/user/'  //删除
}
export default API

