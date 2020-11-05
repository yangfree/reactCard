/**
 *  prj006后使用 全局ajax封装
 * 
 *  date: 2020-07-01
 *  author: Jie
 */
const axios = require('axios');
const Qs = require('qs');

const $http = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8080/api/api' : '/api',
    timeout: 10000
})

function checkStatus(status) {
    const regStatus = /^2\d{2}/;
    return regStatus.test(status);
}

$http.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
$http.interceptors.response.use(
    res => {
        if (checkStatus(res.status)) {
            return res.data;
        } else {
            return "接口返回不是200";
        }
    },
    error => {
        return Promise.reject(error);
    }
)

function get(url, params) {
    return new Promise((resolve, reject) => {
        $http.get(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        $http.post(url, Qs.stringify(params))
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}

function put(url, params) {
    return new Promise((resolve, reject) => {
        $http.put(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}

function del(url, params) {
    return new Promise((resolve, reject) => {
        $http.delete(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export {
    get,
    post,
    put,
    del
}