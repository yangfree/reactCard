const axios = require("../../common/aixos");
const request = require("request");
const express = require("express");
const router = express.Router();
var myConst = require("../const");
const { response } = require("express");
const { $http } = require("../../common/aixos");

// 搜索
router.post('/search', function (req, res, next) {
  console.log("搜索body", req.body)
  const options = {
    url: myConst.apiurl + "/prj009/search/?page=" + req.body.page,
    form: req.body,//浏览器发送过来的req的body  和  后端返回的response的body格式类型不一样?
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj009token.access_token }
  }

  request.post(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    // console.log("搜索返回结果", bodyParse.count)
    var searchResultsNum = bodyParse.count
    var searchResults = bodyParse.results
    res.send({ searchResults, searchResultsNum })
  })
})

// 导出搜索结果
router.post('/export', function (req, res, next) {
  const options = {
    url: myConst.apiurl + "/prj009/export/",
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj009token.access_token }
  }
  console.log("导出option", options)
  request.get(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    console.log("导出文件返回结果", bodyParse)
    res.send({ path: bodyParse.url });
  })
})

// 添加患者信息
router.post('/add', function (req, res, next) {
  console.log('cookies->', req.cookies);
  let myOptions = req.cookies.mobile_token ? req.cookies.mobile_token : req.cookies.prj009token;
  const options = {
    url: myConst.apiurl + "/prj009/info/",
    form: req.body,
    headers: { 'Authorization': 'Bearer ' + myOptions.access_token }
  }
  console.log('新建请求参数->', options)
  request.post(options, function (error, response, body) {
    console.log("增加信息06", body)
    if (response.statusCode == 201) {
      res.send({ msg: body, statusCode: 201 })
    } else {
      res.send({ msg: "您没有添加数据的权限", statusCode: 403 })
    }
  })

})

// // 删除患者信息
router.delete('/remove', function (req, res, next) {
  console.log('删除患者信息: ', req.body);
  let { _id } = req.body;
  const options = {
    url: myConst.apiurl + "/prj009/info/" + _id,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj009token.access_token }
  }
  request.del(options, function (error, response, body) {
    console.log("删除", response);
    if (response.statusCode == 204) {
      res.json({ msg: '成功', status: 200 })
    } else {
      res.json({ msg: "删除失败" })
    }
  })

})

// // 审查和提交
router.post('/check', function (req, res, next) {
  const { _id, check_status, reason_for_check } = req.body;
  console.log("Vue审核提交过来的参数: ", req.body);

  $http({
    url: `${myConst.apiurl}/prj009/info/check/${_id}`,
    method: "POST",
    data: {
      check_status: check_status,
      reason_for_check: reason_for_check,
    },
    headers: {
      'Authorization': 'Bearer ' + req.cookies.prj009token.access_token
    }
  })
    .then((response) => {
      console.log('成功:', response);
      res.json({ msg: '成功', status: 200 });
    })
    .catch((error) => {
      console.log('失败:', error);
      res.json({ msg: '失败' });
    })
})

// 所有患者信息列表
router.post('/list', function (req, res, next) {
  console.log('userList 1.req.body->', req.body)
  console.log('userList 2.req.cookies->', req.cookies)
  const options = {
    url: myConst.apiurl + "/prj009/info/",
    qs: { page: req.body.page },
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj009token.access_token }
  }
  request.get(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    var totalNum = bodyParse.count
    var patientsList = bodyParse.results
    var is_admin = bodyParse.is_admin // 是否是管理员
    console.log('prj009返回的数据:', bodyParse);
    res.send({ patientsList, totalNum, is_admin })
  })
})

// /* info summary history experiment bxray cure等6个表单 */
// /* 增加权限设置 */

// // 获取单个患者信息
router.get('/form', function (req, res, next) {
  const { formName, _id } = req.query;
  let myOptions = req.cookies.mobile_token ? req.cookies.mobile_token : req.cookies.prj009token;
  var options = {
    url: `${myConst.apiurl}/prj009/${formName}/${_id}`,
    // url: myConst.apiurl + '/prj009/'+req.query.formName + '/' + req.query._id,
    headers: { 'Authorization': 'Bearer ' + myOptions.access_token }
  }
  console.log('GET获取query参数: ', options);
  axios.get(options.url, { headers: options.headers })
    .then(response => {
      console.log('请求单个患者信息返回: ', response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    })
})

// // 创建
// router.post('/form', function (req, res, next) {
//   console.log('user.js POST创建Form ' + req.body.formName)
//   console.log('Formdata ' + JSON.stringify(req.body.formData))
//   var options = {
//     url: myConst.apiurl + "/prj005/" + req.body.formName + "/",
//     form: req.body.formData,
//     headers: { 'Authorization': 'Bearer ' + req.cookies.prj005token.access_token }
//   }
//   request.post(options, function (error, response, body) {
//     console.log("创建后服务器返回的数据", body)
//     var bodyParser = JSON.parse(body)
//     res.send({ msg: 'ok', detail: bodyParser.detail })
//   })
// })

// 修改更新
router.put('/form', function (req, res, next) {
  console.log('修改单个信息传递过来的参数: ', req.body);
  const { formName, _id, infoForm } = req.body;
  // 把参数中的数组转化为字符串
  for (let key in infoForm) {
    // console.log('参数项:', infoForm[key]);
    infoForm[key] = Object.prototype.toString.call(infoForm[key]) == "[object Array]" ? JSON.stringify(infoForm[key]) : infoForm[key];
  }
  console.log('user.js PUT修改 infoForm', infoForm)
  let myOptions = req.cookies.mobile_token ? req.cookies.mobile_token : req.cookies.prj009token;
  let options = {
    url: `${myConst.apiurl}/prj009/${formName}/${_id}`,
    // url: myConst.apiurl + '/prj009/info/' + req.body._id + '/',
    infoForm: infoForm,
    headers: { 'Authorization': 'Bearer ' + myOptions.access_token }
  }
  console.log('user.js PUT修改Form ', options)

  $http({
    method: "PUT",
    url: options.url,
    data: options.infoForm,
    headers: options.headers
  })
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.json({
        status: err.response.status,
        detail: err.response.data.detail
      })
      console.log('403是错误吗?', err.response.status, err.response.data);
    })
})

// // 检测是否隐藏
// router.post('/hide', function (req, res, next) {
//   // console.log('检测是否隐藏1 ', req.body)
//   let hideParams = {};
//   if (req.body.question) {
//     const { question, answer } = req.body;
//     hideParams = { question: question, answer: answer }
//   } else {
//     const { formName, _id } = req.body;
//     hideParams = { table_name: formName, info_id: _id }
//   }
//   console.log('检测是否隐藏2: ', hideParams);
//   let myOptions = req.cookies.mobile_token ? req.cookies.mobile_token : req.cookies.prj009token;
//   let options = {
//     url: myConst.apiurl + "/prj009/hide/",
//     form: hideParams,
//     headers: { 'Authorization': 'Bearer ' + myOptions.access_token }
//   }

//   $http({
//     method: "POST",
//     url: options.url,
//     data: options.form,
//     headers: options.headers
//   })
//     .then(response => {
//       const len = Object.keys(response).length;
//       if (len == 0) {
//         res.json({ status: 201, data: response, msg: '空值' });
//       } else {
//         res.json({ status: 200, data: response })
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     })

// })

// // 获取图表方法
// router.get('/echarts', function (req, res, next) {
//   var options = {
//     url: myConst.apiurl + "/prj005/charts/",
//     headers: {
//       'Authorization': 'Bearer ' + req.cookies.prj005token.access_token
//     }
//   }
//   console.log("charts:", options)
//   request(options, function (error, response, body) {
//     var charts = JSON.parse(body)
//     console.log("charts3:", charts)
//     // if (!error && response.statusCode == 200) {
//     res.send(charts);
//     // }
//   })
// });
module.exports = router;
