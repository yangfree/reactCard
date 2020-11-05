/***
 * 登陆模块
 * 测试账号: 13912345678, 17630975003 18618459969
 * 测试密码: 123456,huazai0803 like1979
 */
const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    login: {
      phone: "",
      password: "",
      errPhone: '',
      errPassword: '',
      passwordHideOrShow: true,
    },
    register: {
      phone: "",
      validatecode: "",
      password: "",
      repassword: "",
      codename: '发送验证码',
      passwordHideOrShow: true,
      passwordConfirm: true,
    },
    forgetPassword: {
      phone: "",
      validatecode: "",
      password: "",
      repassword: "",
      codename: '发送验证码',
      passwordHideOrShow: true,
      passwordConfirm: true,
    },
    isWho: {
      login: true,
      register: false,
      forgetPassword: false
    },
    // 验证码按钮时间,是否重新开启
    time: 60,
    showsendcode: false,
    canClick: true,
  },
  // 返回登陆页面
  bindgotologin: function () {
    this.setData({
      ['isWho.login']: true,
      ['isWho.register']: false,
      ['isWho.forgetPassword']: false,
      ['register.phone']: '',
      ['register.validatecode']: '',
      ['register.password']: '',
      ['register.repassword']: '',
      ['forgetPassword.phone']: '',
      ['forgetPassword.validatecode']: '',
      ['forgetPassword.password']: '',
      ['forgetPassword.repassword']: '',
    })
  },
  //============================ 登陆模块 ===========================
  //获取用户输入的手机号
  loginUserPhone: function (e) {
    // console.log(e);
    this.setData({
      'login.phone': e.detail,
    })
    // console.log(this.data.login);
  },
  // 获取用户输入的密码
  loginUserPass: function (e) {
    this.setData({
      'login.password': e.detail,
    })
    // console.log(this.data.login.password);
  },
  // 密码可视化
  loginUserClear: function (e) {
    this.setData({
      'login.passwordHideOrShow': false,
    })
  },
  // 切换注册页面
  bindBtnSignup: function () {
    this.setData({
      ['isWho.login']: false,
      ['isWho.register']: true,
      ['isWho.forgetPassword']: false,
      ['login.phone']: "",
      ['login.password']: "",
    })
  },
  // 切换忘记密码页面
  bindBtnForgetPwd: function () {
    this.setData({
      ['isWho.login']: false,
      ['isWho.register']: false,
      ['isWho.forgetPassword']: true,
      ['login.phone']: "",
      ['login.password']: "",
    })
  },
  // 登陆逻辑处理
  handleLogin: function (e) {
    var that = this
    var loginurl = con.BaseUrl + con.LoginUrl
    // console.log("login url = " + loginurl)
    let config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    let username = this.data.login.phone;
    let password = this.data.login.password;

    // 判断用户名和密码是否为空
    if (username === '' || password === '') {
      Toast('用户名或者密码不能为空');
      return false;
    }
    // 用户名和密码简单的规则校验
    var params = {
      "username": username,
      "password": password,
      "grant_type": "password",
      "client_id": con.Client_Id,
      "scope": "doctor",
      "client_secret": con.Client_Secret
    }
    var loginparams = ''
    for (let item in params) {
      loginparams += encodeURIComponent(item) + '=' + encodeURIComponent(params[item]) + '&'
    }
    axios.post(loginurl, loginparams, config)
      .then(resp => {
        if (resp.status == 200) {
          // console.log('POST请求成功:', resp.data)
          wx.setStorage({
            key: "token",
            data: resp.data.access_token
          })
          wx.setStorage({
            key: "refresh_token",
            data: resp.data.refresh_token
          })
          that.getuserinfo(resp.data.access_token)
        } else {
          // console.log('POST请求失败:', JSON.stringify(resp))
          Toast("接口返回错误");
        }
      })
      .catch(err => {
        console.log(err);
        Toast('登录失败，请检查用户名和密码');
      });
  },
  // 保存用户信息
  getuserinfo: function (token) {
    // var that = this
    var userinfourl = con.BaseUrl + con.GetDoctorInfoUrl
    // console.log("get treatment list url = " + userinfourl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(userinfourl, config)
      .then(resp => {
        // console.log(resp);
        if (resp.status >= 200) {
          // console.log('GET请求成功:', resp.data)
          if (resp.data.is_success) {
            if (!resp.data.user_picture) {
              wx.showModal({
                content: '请尽快上传头像',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../user/userinfo'
                    });
                  }
                }
              })
            } else {
              wx.switchTab({
                url: '../treatment/treatment'
              });
            }

          } else {
            var modifybasicinfourl = `/modifybasicinfo?refuse_reason=${resp.data.reason}&doctor_name=${resp.data.username}&doctor_hospital=${resp.data.hospital}&doctor_department=${resp.data.department}&doctor_good_point=${resp.data.good_point}&doctor_good_at=${resp.data.good_at}&doctor_summary=${resp.data.summary}`
            // console.log(modifybasicinfourl);
            wx.navigateTo({
              url: '../user' + modifybasicinfourl,
            })
          }
        } else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        // console.log(error.data.detail);
        console.log('网络错误:', error);
      });

  },

  // ===============================注册模块===========================
  // 获取注册手机号
  rigesterUserPhone: function (e) {
    // console.log(e);
    this.setData({
      'register.phone': e.detail,
    })
  },
  // 短信验证码逻辑
  registerGetSMSCode: function () {
    // console.log("getSMSCode")
    // var that = this
    var smsurl = con.BaseUrl + con.SMSUrl + this.data.register.phone + "/"
    console.log("sms url = " + smsurl)
    axios.get(smsurl)
      .then(resp => {
        // console.log(resp);
        if (resp.status >= 200) {
          // console.log('GET请求成功:', resp.data)
          this.setData({
            'register.validatecode': resp.data.code,
          })
        } else {
          console.log('GET请求失败:', JSON.stringify(resp))
        }
      })
      .catch(error => {
        console.log('网络错误:', JSON.stringify(error));
        Toast("获取验证码失败")
      });

  },
  // 倒计时效果
  registerGetCode: function () {
    // console.log(this.data.register.phone)
    if (this.data.register.phone.length != 11) {
      Toast("请输入正确的手机号")
    } else {
      // console.log(!this.data.canClick);
      if (!this.data.canClick) return false;
      let time = this.data.time;
      this.setData({
        ['register.codename']: time + 's',
      })
      let timer = setInterval(() => {
        time--;
        if (time < 0) {
          clearInterval(timer);
          this.setData({
            ['register.codename']: '发送验证码',
            showsendcode: false,
            time: 60,
            canClick: true,
          })
        } else {
          this.setData({
            ['register.codename']: time + 's',
            showsendcode: true,
            canClick: false,
          })
          return false;
        }
      }, 1000)
      // return false;
      this.registerGetSMSCode()
    }
  },
  // 获取短信验证码
  registerCode: function (e) {
    console.log(e);
    this.setData({
      ['register.validatecode']: e.detail,
    })
  },
  // 获取用户注册密码
  registerUserPass: function (e) {
    this.setData({
      ['register.password']: e.detail,
    })
  },
  // 获取用户确认密码
  registerUserConfirePass: function (e) {
    this.setData({
      ['register.repassword']: e.detail,
    })
  },
  // 查看用户注册密码
  registerUserClear: function () {
    this.setData({
      'register.passwordHideOrShow': false,
    })
  },
  // 查看用户确认密码
  registerUserConfirmClear: function () {
    this.setData({
      'register.passwordConfirm': false,
    })
  },
  // 注册按钮提交
  handleSignup: function () {
    let phone = this.data.register.phone,
      password = this.data.register.password,
      subpassword = this.data.register.repassword,
      validate_code = this.data.register.validatecode;
    // 用户信息的判断
    if (phone === '') {
      Toast('手机号不能为空');
      return false;
    }
    if (validate_code === '') {
      Toast('短信验证码不能为空');
      return false;
    }
    if (password === '' || subpassword === '') {
      Toast('密码或确认密码不能为空');
      return false;
    }
    if (subpassword !== password) {
      Toast('两次输入的密码不相同');
      return false;
    }
    // let that = this
    let signupurl = con.BaseUrl + con.SignupUrl
    let registerParams = {
      phone: this.data.register.phone,
      password: this.data.register.password,
      subpassword: this.data.register.repassword,
      validate_code: this.data.register.validatecode
    }
    // console.log("signup url = " + signupurl, registerParams);
    axios.post(signupurl, registerParams)
      .then(res => {
        console.log(res);
        if (/2\d{2}/.test(res.status)) {
          Toast(res.data.detail);
          this.setData({
            ['register.phone']: '',
            ['register.validatecode']: '',
            ['register.password']: '',
            ['register.repassword']: '',
            ['register.codename']: '发送验证码',
            ['isWho.login']: true,
            ['isWho.register']: false,
            ['isWho.forgetPassword']: false,
          })
        } else {
          console.log(res.data.detail);
        }
      })
      .catch(err => {
        console.log(err);
        Toast("注册失败")
      })
  },

  // ==========================忘记密码模块===========================
  // 获取忘记密码手机号
  forgetPasswordUserPhone: function (e) {
    // console.log(e);
    this.setData({
      ['forgetPassword.phone']: e.detail,
    })
  },
  // 监听忘记密码短信验证码
  forgetPasswordCode: function (e) {
    this.setData({
      ['forgetPassword.validatecode']: e.detail,
    })
  },
  // 倒计时效果
  forgetPasswordGetCode: function () {
    if (this.data.forgetPassword.phone.length != 11) {
      Toast("请输入正确的手机号")
    } else {
      // console.log(!this.data.canClick);
      if (!this.data.canClick) return false;
      let time = this.data.time;
      this.setData({
        ['forgetPassword.codename']: time + 's',
      })
      let timer = setInterval(() => {
        time--;
        if (time < 0) {
          clearInterval(timer);
          this.setData({
            ['forgetPassword.codename']: '发送验证码',
            showsendcode: false,
            time: 60,
            canClick: true,
          })
        } else {
          this.setData({
            ['forgetPassword.codename']: time + 's',
            showsendcode: true,
            canClick: false,
          })
          return false;
        }
      }, 1000)
      // 获取验证码
      this.forgetPasswordGetSMSCode()
    }
  },
  // 短信验证码逻辑
  forgetPasswordGetSMSCode: function () {
    // console.log("getSMSCode")
    // var that = this
    var smsurl = con.BaseUrl + con.SMSUrl + this.data.forgetPassword.phone + "/"
    // console.log("sms url = " + smsurl)
    axios.get(smsurl)
      .then(resp => {
        // console.log(resp);
        if (resp.status >= 200) {
          // console.log('GET请求成功:', resp.data)
          this.setData({
            'forgetPassword.validatecode': resp.data.code,
          })
        } else {
          console.log('GET请求失败:', JSON.stringify(resp))
        }
      })
      .catch(error => {
        console.log('网络错误:', JSON.stringify(error));
        Toast("获取验证码失败")
      });

  },
  // 获取密码
  forgetPasswordUserPass: function (e) {
    this.setData({
      ['forgetPassword.password']: e.detail,
    })
  },
  // 密码查看
  forgetPasswordUserClear: function () {
    this.setData({
      ['forgetPassword.passwordHideOrShow']: false,
    })
  },
  // 获取确认密码
  forgetPasswordUserConfirePass: function (e) {
    this.setData({
      ['forgetPassword.repassword']: e.detail,
    })
  },
  // 查看确认密码
  forgetPasswordUserConfirmClear: function () {
    this.setData({
      ['forgetPassword.passwordConfirm']: false,
    })
  },
  // 重置密码
  handleForgetPassword: function () {
    let forgetpasswordurl = con.BaseUrl + con.ForgetPasswordUrl;
    let phone = this.data.forgetPassword.phone;
    let password = this.data.forgetPassword.password;
    let subpassword = this.data.forgetPassword.repassword;
    let validate_code = this.data.forgetPassword.validatecode;
    let forgetpasswordParams = {
      phone,
      password,
      subpassword,
      validate_code,
    }
    // 用户信息的判断
    if (phone === '') {
      Toast('手机号不能为空');
      return false;
    }
    if (validate_code === '') {
      Toast('短信验证码不能为空');
      return false;
    }
    if (password === '' || subpassword === '') {
      Toast('密码或确认密码不能为空');
      return false;
    }
    if (subpassword !== password) {
      Toast('两次输入的密码不相同');
      return false;
    }
    // console.log(forgetpasswordParams, forgetpasswordurl);
    axios.put(forgetpasswordurl, forgetpasswordParams)
      .then(res => {
        // console.log(res);
        if (/2\d{2}/.test(res.status)) {
          Toast(res.data.detail);
          this.setData({
            ['forgetPassword.phone']: '',
            ['forgetPassword.validatecode']: '',
            ['forgetPassword.password']: '',
            ['forgetPassword.repassword']: '',
            ['forgetPassword.codename']: '发送验证码',
            ['isWho.login']: true,
            ['isWho.register']: false,
            ['isWho.forgetPassword']: false,
          })
        } else {
          Toast('接口返回错误');
        }
      })
      .catch(err => {
        console.log(err);
        Toast('重置密码失败');
      })
  },
})