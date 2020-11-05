/**
 * 测试账号: 12312312344 18911735606
 * 测试密码: asdf1234 like1979
 * 
 */
import Toast from '../../vant-dist/toast/toast';
import common from '../../utils/common';
Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function() {
    let that = this;
    // console.log('url: ', common.BaseUrl + common.GetTokenUrl);
    if (that.data.phone.length == 0 || that.data.password.length == 0) {
      Toast({
        message: '用户名和密码不能为空',
        duration: 2000
      })
    } else { 
      wx.request({
        url: common.BaseUrl + common.GetTokenUrl,
        method: "POST",
        data: {
          username: that.data.phone,
          password: that.data.password,
          grant_type: common.Grant_Type,
          client_id: common.Client_Id,
          scope: common.Scope,
          client_secret: common.Client_Secret
        },
        header: {
          "content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          const token = res.data.access_token
          console.log("开始登录",res)
          if (res.statusCode == 400) {
              Toast({
                message: '用户名或密码错误',
                duration: 1500
              })
          } else {
            // 登录后缓存token
            wx.setStorage({
              key: "user_token",
              data: res.data,
              success(res) {
                // console.log("存储成功,跳转", res)
                Toast.success({
                  message: '登录成功',
                  duration: 1000
                })
                wx.reLaunch({
                  url: '../account/account',
                })
              },
              fail(res) {
                console.log("setStorage存储token失败")
              }
            })
            // 登录后缓存用户信息
            wx.request({
              url: common.BaseUrl + common.PatientInfoUrl,
              method: 'GET',
              header: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
              },
              success(res) {
                // console.log('登录后获取的个人信息', res.data)
                wx.setStorage({
                  key: 'user_info',
                  data: res.data,
                  success(res) {
                    // console.log("登录后个人信息存储成功", res)
                  }
                })

              }
            })
            // 到后台换取 openId, sessionKey, unionId
            wx.login({
              success: res => {
                var code = res.code;
                // console.log("拿到code", res.code)
                wx.request({
                  // url:  'https://api.weixin.qq.com/sns/jscode2session?' +
                  //       'appid=' + that.data.appid +
                  //       '&secret=' + that.data.secret +
                  //       '&js_code=' + code +
                  //       '&grant_type=' + 'authorization_code',
                  url: common.BaseUrl + common.OpenIdUrl + code + '/',
                  header: {
                    'Authorization': 'Bearer ' + token,
                  },
                  method: 'GET',
                  success: function (res) {
                    // console.log("服务器返回的openid和session_key", res.data)
                    var obj = {};
                    // obj.session_key = res.data.session_key;
                    obj.openid = res.data.openid;
                    obj.expires_in = Date.now() + res.data.expires_in;
                    // console.log(obj);
                    wx.setStorageSync('id_cache', obj);//存储openid  
                  }
                })

              }
            })
          }
        },
        fail: function(res) {
          console.log("request登录失败",res)
        }
      });

    }
  },
  //转到注册页面
  jumpToReg: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //转到修改密码页面
  jumpToForget: function(){
    wx.navigateTo({
      url: '../forget_password/forget_password',
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
      wx.clearStorage()
  },
})