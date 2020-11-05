import Toast from '../../vant-dist/toast/toast';
import common from '../../utils/common';
var interval = null //倒计时函数
Page({
  data: {
    username: '',
    idCard: '',
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

  // 获取输入的昵称
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value,
    })
  },
  // 获取输入的身份证
  cardInput: function (e) {
    this.setData({
      idCard: e.detail.value,
    })
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
    if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(that.data.phone))) {
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
  register: function () {
    // console.log(this.data);
    if (this.data.username === '') {
      Toast({
        message: '昵称不能为空.',
        duration: 2000
      })
      return false;
    }
    if (this.data.idCard === '') {
      Toast({
        message: '身份证号不能为空.',
        duration: 2000
      })
      return false;
    }
    if (this.data.phone === '') {
      Toast({
        message: '手机号不能为空.',
        duration: 2000
      })
      return false;
    }
    if (this.data.user_code === '') {
      Toast({
        message: '验证码不能为空.',
        duration: 2000
      })
      return false;
    }
    if (this.data.password === '') {
      Toast({
        message: '密码不能为空.',
        duration: 2000
      })
      return false;
    }
    if (this.data.confirm === '') {
      Toast({
        message: '确认密码不能为空.',
        duration: 2000
      })
      return false;
    }
    if (this.data.confirm !== this.data.password) {
      Toast({
        message: '密码和确认密码不一致.',
        duration: 2000
      })
      return false;
    }
    // 身份证的验证 简单只判断了位数
    if (this.data.idCard.length < 18) {
      Toast({
        message: '请输入正确的身份证',
        duration: 2000
      })
      return false;
    }

    // 请求开始提交
    if (this.data.admin_code == this.data.user_code) {
      wx.request({
        url: common.BaseUrl + common.SignupUrl,
        method: "POST",
        data: {
          username: this.data.username,
          id_card: this.data.idCard,
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
          console.log('返回值:', res)
          if (res.statusCode == 400) {
            Toast({
              message: '该手机号已被注册，请登录',
              duration: 2000,
            });
            return
          }
          wx.navigateTo({
            url: '../login/login',
          })
        },
        fail: function () {
          console.log("注册请求失败")
        }
      })
    } else {
      Toast({
        message: '验证码错误',
        type: 'fail',
        duration: 2000
      })
    }
  },
  backToLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})