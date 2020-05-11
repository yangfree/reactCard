import config from '../config/';
import axios from 'axios';
import qs from 'qs';

const $http = axios.create(config);
// 添加请求拦截器
$http.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 添加响应拦截器
$http.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

// 封装get请求用于拉去数据
export function get(url, params) {
  return new Promise((resolve, reject) => {
    $http.get(url, params)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(err => {
        reject(err.data);
      })
  })
}

// 封装post请求用于添加和更新数据
export function post(url, params) {
  return new Promise((resolve, reject) => {
    $http.post(url, qs.stringify(params))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

// 封装put请求更新单条数据
export function put(url, params) {
  return new Promise((resolve, reject) => {
    $http.put(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

// 封装delete请求用于删除数据
export function del(url, params) {
  return new Promise((resolve, reject) => {
    $http.delete(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}