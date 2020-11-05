import axios from 'axios'

let baseUrl = ''
if (process.env.NODE_ENV === "development") {
    baseUrl = 'http://127.0.0.1:8080/api/api' //开发环境用
} else {
    baseUrl = '/api'
}

// 登录
export const apiLogin = params => {
    return axios.post(`${baseUrl}/login`, params).then(res => res.data)
}
//找回密码
export const apiSendEmail = params => {
    return axios.post(`${baseUrl}/login/sendemail`, params).then(res => res.data)
}
//进入项目列表
export const apiHome = params => {
    return axios.post(`${baseUrl}/home`, params)
}
//进入项目主页
export const apiPrj = params => {
    return axios.post(`${baseUrl}/home` + params.linkurl, params)
}
//修改密码
export const apiChangePassword = params => {
    return axios.post(`${baseUrl}/password`, params).then(res => res.data)
}

