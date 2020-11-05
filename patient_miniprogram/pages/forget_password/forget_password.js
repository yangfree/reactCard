import Toast from '../../vant-dist/toast/toast';
import common from '../../utils/common';
var interval = null //倒计时函数
Page({
  data: {
    phone: '',
    admin_code: '',
    user_code: '',
    password: '',
    confirm: '',
    confirmMsg: '',
    disabled: false,

    time: '发送验证码',
    currentTime: 60
  },

  // 获取输入账号
  phoneInput: function (e) {
    // console.log(e.detail)
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取用户输入的验证码
  codeInput: function (e) {
    this.setData({
      user_code: e.detail.value //e.detail.value
    })
  },
  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 获取输入密码
  confirmInput: function (e) {
    this.setData({
      confirm: e.detail.value,
    })
    if (this.data.password !== this.data.confirm) {
      this.setData({
        confirmMsg: "两次输入密码不一致",
        // disabled: true
      })
    } else {
      this.setData({
        confirmMsg: "",
        // disabled:false
      })
    }
  },
  // 获取短信验证码
  validate: function () {
    let that = this;
    if (that.data.phone == '') {
      Toast({
        message: '请输入您的手机号',
        duration: 2000,
      });
      return;
    }
    if (!(/^1[2|3|4|5|8][0-9]\d{8}$/.test(that.data.phone))) {
      Toast({
        message: '手机号输入错误',
        duration: 2000,
      });
      return;
    }

    wx.request({
      url: common.BaseUrl + common.SMSUrl + that.data.phone + '/',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          admin_code: res.data.code,
          // user_code: res.data.code,
        })
        if (res.data.code != undefined) {
          Toast({
            message: '短信验证码发送成功，请注意查收',
            duration: 2000,
          });
          // 60秒后重新获取验证码
          var inter = setInterval(function () {
            that.setData({
              disabled: true,
              // sendColor: '#cccccc',
              time: that.data.currentTime + 's后重发',
              currentTime: that.data.currentTime - 1
            });
            if (that.data.currentTime < 0) {
              clearInterval(inter)
              that.setData({
                // sendColor: '#363636',
                time: '发送验证码',
                currentTime: 60,
                disabled: false
              });
            }
          }.bind(that), 1000);

        } else {
          Toast({
            message: '短信验证码发送失败',
            duration: 2000,
          });
        }
        console.log("系统验证码", res.data.code)
      },
      fail: function (res) {
        console.log("验证码发送错误")
      }
    });


  },
  // 注册
  resetPassword: function () {
    if (this.data.phone.length == 0 ||
      this.data.password.length == 0 ||
      this.data.user_code.length == 0) {
      Toast({
        message: '用户名、密码、验证码不能为空',
        duration: 2000,
      });
    } else {
      if (this.data.admin_code == this.data.user_code) {
        wx.request({
          url: common.BaseUrl + common.ForgetPasswordUrl,
          method: "PUT",
          data: {
            phone: this.data.phone,
            password: this.data.password,
            subpassword: this.data.confirm,
            validate_code: this.data.user_code,
          },
          header: {
            "content-Type": "application/x-www-form-urlencoded"
            // 'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode == 400) {
              Toast({
                message: '修改密码失败',
                duration: 2000,
              });
              return
            }
            Toast('修改成功')
            wx.navigateTo({
              url: '../login/login',
            })
          },
          fail: function () {
            console.log("修改密码请求失败")
          }
        })
      } else {
        Toast({
          message: '验证码错误',
          type: 'fail',
          duration: 2000
        })
      }

    }
  },
  backToLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})