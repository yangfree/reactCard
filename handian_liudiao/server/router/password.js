const request = require("request");
const express = require("express");
const router = express.Router();
var myConst = require("./const");

router.post('/', function (req, res, next) {
    var codeData = {
        "old_password": req.body.oldcode,
        "new_password": req.body.newcode,
    }
    var options = {
        url: myConst.apiurl + "/users/" + req.cookies.userid.id +"/changepassword/",
        form: codeData,
        headers: {
            'Authorization': 'Bearer ' + req.cookies.usertoken.access_token
        }
    };
    console.log("看这里", options);
    request.put(options, function (error, response, body) {
        console.log("6. cipher response.body", body);
        var bodyParse = JSON.parse(body);
        // res.clearCookie("userinfo", "prj001token", "usertoken");
        res.send(bodyParse)

    });
})

module.exports = router;