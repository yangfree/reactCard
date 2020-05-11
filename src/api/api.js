import { get, post, del, put } from './axios';

// 获取基本信息请求
export const getBasics = (url, params) => {
  return get(`admin`, params);
}
// 获取联系方式请求
export const getConnects = (url, params) => {
  return get(`admin/connects`, params);
}
// 获取友情链接列表
export const getFriendsList = (url, params) => {
  return get(`admin/friends`, params);
}