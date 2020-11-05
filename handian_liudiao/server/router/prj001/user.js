// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import { LoginUsers, Users } from '../src/mock/data/user'
// let _Users = Users
const request = require("request");
const express = require("express");
const router = express.Router();
var myConst = require("../const");

// 搜索
router.post('/search', function (req, res, next) {
  const options = {
    url: myConst.apiurl + "/prj001/info/search/",
    form: req.body.search,//浏览器发送过来的req的body  和  后端返回的response的body格式类型不一样?
    qs: { page: req.body.page },
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  console.log("搜索option", options)
  request.post(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    // console.log("搜索返回结果", bodyParse)
    var searchResultsNum = bodyParse.count
    var searchResults = bodyParse.results
    res.send({ searchResults, searchResultsNum })
  })
})
// 导出搜索结果
router.post('/export', function (req, res, next) {
  const options = {
    url: myConst.apiurl + "/prj001/info/search/",
    form: req.body.search,
    qs: { page: req.body.page },
    // timeout: 120000,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  console.log("导出option", options)
  request.post(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    console.log("导出文件返回结果", bodyParse)
    res.send({ path: bodyParse.path });
  })
})
// 添加患者信息
router.post('/add', function (req, res, next) {
  console.log('添加患者信息', typeof (req.body))
  const options = {
    url: myConst.apiurl + "/prj001/info/create/",
    form: req.body.patientInfo,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  console.log(options)
  request.post(options, function (error, response, body) {
    console.log("增加信息", body)
    if (response.statusCode == 201) {
      res.send({ msg: "成功了", statusCode: 201 })
    } else {
      res.send({ msg: "您没有添加数据的权限", statusCode: 403 })
    }
  })

})
// 删除患者信息
router.post('/remove', function (req, res, next) {
  const options = {
    url: req.body.url,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  request.del(options, function (error, response, body) {
    if (response.statusCode == 204) {
      res.send({ msg: '' })
    } else {
      var bodyParse = JSON.parse(body)
      res.send({ msg: bodyParse.detail })
    }
  })

})
// 审查
router.post('/check', function (req, res, next) {
  var options = {
    url: myConst.apiurl + "/prj001/info/" + req.body.id + '/checked/',
    form: req.body,
    headers: {
      'Authorization': 'Bearer ' + req.cookies.prj001token.access_token
    }
  }
  console.log("审核", options)
  request.post(options, function (error, response, body) {
    console.log("发送")
    if (!error && response.statusCode == 200) {
      res.send({ msg: '审查成功' })
    } else {
      res.send({ msg: '审查失败' })
    }

  })
})

// 所有患者信息列表
router.post('/list', function (req, res, next) {
  // console.log('user.js 1.req.body->', req.body)
  // console.log('user.js 2.req.cookies->', req.cookies)
  const options = {
    url: myConst.apiurl + "/prj001/info/",
    qs: { page: req.body.page },
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  request.get(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    var totalNum = bodyParse.count
    var is_admin = bodyParse.is_admin
    var patientsList = bodyParse.results
    // console.log('user.js 服务器返回的所有数据列表',bodyParse)
    res.send({ patientsList, totalNum, is_admin })
  })

})

/* info summary history experiment bxray cure等6个表单 */
// 获取
router.get('/form', function (req, res, next) {
  console.log('user.js GET获取Form ', req.query.url)
  var options = {
    url: req.query.url,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  request.get(options, function (error, response, body) {
    console.log('user.js GET获取到的Form body')
    var patientForm = JSON.parse(body)
    res.send(patientForm)
  })
})
// 创建
router.post('/form', function (req, res, next) {
  console.log('user.js POST创建Form ' + req.body.formName)
  var options = {
    url: myConst.apiurl + "/prj001/" + req.body.formName + "/",
    form: req.body.formData,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  request.post(options, function (error, response, body) {
    console.log("user.js POST创建成功后返回的Form body")
    res.send({ msg: 'ok' })
  })
})
// 修改
router.put('/form', function (req, res, next) {
  console.log('user.js PUT修改Form ', req.body.formData.url)
  var options = {
    url: req.body.formData.url,
    form: req.body.formData,
    headers: { 'Authorization': 'Bearer ' + req.cookies.prj001token.access_token }
  }
  request.put(options, function (error, response, body) {
    console.log('user.js PUT修改成功后返回的Form body', body)
    res.send({ msg: 'ok' })
  })
})


router.get('/echarts', function (req, res, next) {
  var options = {
    url: myConst.apiurl + "/prj001/charts/",
    headers: {
      'Authorization': 'Bearer ' + req.cookies.prj001token.access_token
    }
  }
  console.log("charts:", options)
  request(options, function (error, response, body) {
    var charts = JSON.parse(body)
    console.log("charts3:", charts)
    // if (!error && response.statusCode == 200) {
    res.send(charts);
    // }
  })
});
module.exports = router;
