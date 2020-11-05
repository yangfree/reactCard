var request = require("request");
var express = require('express');
var myconst = require("../const");
var router = express.Router();

var prj_code = "project00g";


router.post('/login', function (req, res, next) {
    res.clearCookie("mobile_token")
    res.clearCookie("userinfo")
    console.log("进入手机页面", prj_code);
    var options = {
        url: myconst.apiurl + "/o/token/",
        form: {
            "username": 'prj006-patient@handian.com',
            "password": 'asdf1234',
            "grant_type": "password",
            "scope": myconst.scope_users + " " + myconst.scope_prj00g,
            "client_id": myconst.client_id,
            "client_secret": myconst.client_secret
        },
    }
    request.post(options, function (error, response, body) {
        var obj = JSON.parse(body);
        console.log('手机登录页面接口返回 body: ', body);

        res.cookie("mobile_token", {
            "access_token": obj.access_token,
            "refresh_token": obj.refresh_token,
            "scope": obj.scope,
            "expires_in": obj.expires_in
        }, { maxAge: 1000 * 60 * 60 * 8, httpOnly: true }); //cookie 4小时有效时间

        // res.cookie("userinfo", {
        //     "email": 'prj3-patient@handian.com',
        //     "password": 'asdf1234'
        //     }, {maxAge: 1000 * 60 * 60 * 8, httpOnly: true});

        res.send({ status: 200, msg: 'ok' })
    })
})

router.post('/', function (req, res, next) {
    var form_data = req.body;
    var options = {
        body: form_data.data,
        url: myconst.apiurl + "/prj00g/mobile/",
        json: true,
        headers: {
            'Authorization': 'Bearer ' + req.cookies.mobile_token.access_token,
            "content-type": "application/json"
        }
    }
    console.log("手机端options:", options);
    console.log("手机端form_data:", form_data);
    request.post(options, function (error, response, body) {
        console.log("JSON.parse(body).msg:", body);
        console.log("response.statusCode: ", response.statusCode);
        res.send({ status: response.statusCode, msg: body.msg });

    })
})

router.post('/area', function (req, res, next) {
    var options = {
        form: { prj_code: prj_code },
        url: myconst.apiurl + "/users/area-list/",
        headers: {
            // 'Authorization': 'Bearer ' + req.cookies.mobile_token.access_token,
            'Content-Type': 'application/json'
        }
    }
    request.post(options, function (error, response, body) {
        console.log("获取地区信息", body);
        var area_data = JSON.parse(body);
        res.send({ area_data: area_data });
    })

})
router.post('/hospital', function (req, res, next) {
    var options = {
        form: {
            area: req.body.area,
            prj_code: prj_code
        },
        url: myconst.apiurl + "/users/area/",
        headers: {
            // 'Authorization': 'Bearer ' + req.cookies.mobile_token.access_token,
            'Content-Type': 'application/json'
        }
    };
    request.post(options, function (error, response, body) {
        console.log("获取医院信息", body);
        var hospital_data = JSON.parse(body);
        res.send({ hospital_data: hospital_data });
    })
})
router.post('/owner', function (req, res, next) {
    var area_url = myconst.apiurl + "/users/area/";
    var hospital = req.body.hospital;
    // console.log("-----",area);
    var options = {
        form: {
            hospital: hospital,
            prj_code: prj_code
        },
        url: area_url,
        headers: {
            // 'Authorization': 'Bearer ' + req.cookies.mobile_token.access_token,
            'Content-Type': 'application/json'
        }
    };
    request.put(options, function (error, response, body) {
        console.log("获取owner信息", body);
        var owner_data = JSON.parse(body);
        res.send({ owner_data: owner_data });
    })

})


module.exports = router;
