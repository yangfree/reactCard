import { get, post, put, del } from './ajax/myAxios';

// // 添加患者
export const apiAddPatient = params => {
    return post(`/prj009/user/add`, params)
}


// 审查信息
export const apiCheckPatient = params => {
    return post(`/prj009/user/check`, params)
}
// 搜索患者
export const apiSearchPatient = params => {
    return post(`/prj009/user/search`, params)
}
// 获取患者列表
export const apiGetPatientsList = params => {
    return post(`/prj009/user/list`, params)
}
// 删除单个患者信息
export const apiRemovePatient = params => {
    return del(`/prj009/user/remove`, params)
}

// // 获取单个患者某个Form
export const apiGetPatientDataForm = params => {
    return get(`/prj009/user/form`, { params })
}

// // 修改单个患者某个Form
export const apiUpdatePatientDataForm = params => {
    return put(`/prj009/user/form`, params)
}

// 导出接口
export const apiExportFile = () => {
    return post(`/prj009/user/export`)
}


// // // 登录手机端界面
// export const apiMobileLogin = params => {
//     return post(`/mobile/prj009/login`, params)
// }

