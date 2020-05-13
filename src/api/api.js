import { get, post, del, put } from './axios';

// 获取基本信息请求
export const getBasics = (url, params) => {
  return get(`/admin`, params);
}
// 获取联系方式请求
export const getConnects = (url, params) => {
  return get(`/admin/connects`, params);
}
// 获取友情链接列表
export const getFriendsList = (url, params) => {
  return get(`/admin/friends`, params);
}
// 获取用户列表
export const getUsersList = (url, params) => {
  return get('/admin/users', params);
}
// 获取协议文件列表
export const getFilesList = (url, params) => {
  return get('/admin/files', params);
}

// 更新基本信息
export const updateBasics = (url, params) => {
  return put(`/admin`, params);
}