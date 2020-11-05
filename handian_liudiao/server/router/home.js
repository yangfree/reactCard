const express = require("express")
const request = require("request")
const router = express.Router()
var myConst = require("./const")

router.post('/', function (req, res, next) {
    // res.header('Access-Control-Allow-Credentials = true');
    // res.header("Access-Control-Allow-Methods", "POST,GOPTIONS");

    console.log('req.cookies: ', req.cookies)
    options = {
        url: myConst.apiurl + "/users/login/",
        form: {
            email: req.cookies.user.email,
            password: req.cookies.user.password
        },
        headers: { 'Authorization': 'Bearer ' + req.cookies.usertoken.access_token }
    }
    console.log("home.js 进入流程", options)
    request.post(options, function (error, response, body) {
        console.log("home.js request.post的body", body)
        var bodyParse = JSON.parse(body)
        res.cookie("userid", { "id": bodyParse.id }, { maxAge: 1000 * 60 * 60 * 4, httpOnly: true });
        var newoptions = {
            url: bodyParse.url,
            headers: { 'Authorization': 'Bearer ' + req.cookies.usertoken.access_token }
        }
        // get http://47.94.22.221:9002/users/4/ usertoken
        // 返回 该用户所有个人信息,包括参与的所有项目
        console.log('个人信息参数:', newoptions)
        request.get(newoptions, function (error, response, body) {
            var userinfo = JSON.parse(body)
            console.log("home.js request.get的userinfo", userinfo)
            res.send({ msg: 'ok', userinfo: userinfo })
        })

    })

})
router.post('/:prjname', function (req, res, next) {
    var prjname = req.params.prjname
    var url = myConst.apiurl + "/o/token/";
    var options = {
        url: url,
        form: {
            "username": req.cookies.user.email,
            "password": req.cookies.user.password,
            "grant_type": "password",
            "scope": eval('myConst.scope_' + prjname),
            // "scope":prjname,
            "client_id": myConst.client_id,
            "client_secret": myConst.client_secret
        }
    }
    request.post(options, function (error, response, body) {
        var prjToken = JSON.parse(body)
        console.log('获取的' + prjname + 'token', prjToken)
        res.cookie(prjname + "token", prjToken, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true })
        res.send({ msg: "ok" })
    })
})

module.exports = router