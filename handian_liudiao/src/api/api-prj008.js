import { get, post, put, del } from '../api/ajax/myAxios';

// // 添加患者
export const apiAddPatient = params => {
    return post(`/prj008/user/add`, params)
}
// // 审查信息
export const apiCheckPatient = params => {
    return post(`/prj008/user/check`, params)
}
// // 搜索患者
export const apiSearchPatient = params => {
    return post(`/prj008/user/search`, params)
}
// 获取患者列表
export const apiGetPatientsList = params => {
    return post(`/prj008/user/list`, params)
}
// 删除单个患者信息
export const apiRemovePatient = params => {
    return del(`/prj008/user/remove`, params)
}

// 获取单个患者某个Form
export const apiGetPatientDataForm = params => {
    return get(`/prj008/user/form`, { params })
}

// // 修改单个患者某个Form
export const apiUpdatePatientDataForm = params => {
    return put(`/prj008/user/form`, params)
}

// 获取跨表隐藏
export const apiGetHideCode = params => {
    return post(`/prj008/user/hide`, params);
}

// 导出接口
export const apiExportFile = () => {
    return post(`/prj008/user/export`)
}

// 登录手机端界面
export const apiMobileLogin = params => {
    return post(`/mobile/prj008/login`, params)
}

