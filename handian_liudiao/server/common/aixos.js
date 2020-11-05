/**
 * TODO: headers提取公共处理? cookie中的项目路径如何解决?
 *  date: 2020-07-01
 *  author: Jie
 */

const axios = require('axios');
const Qs = require('qs');
const _CONST = require('../router/const');

const $http = axios.create({
    baseURL: _CONST.apiurl,
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
            return res;
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
                reject(err);
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
                reject(err);
            })
    })
}

function patch(url, params) {
    return new Promise((resolve, reject) => {
        $http.patch(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
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

module.exports = {
    get,
    post,
    put,
    del,
    patch,
    $http
}