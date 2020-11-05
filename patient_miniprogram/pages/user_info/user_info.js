// pages/user_info/user_info.js
import Toast from '../../vant-dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    submitUserInfo: {
      sex: '',
      age: '',
      username: '',
      id_card: '',
      nick_name: '',
      birthday: '',
      position: '',
      email: '',
      phone: '',

      // 没用参数
      id: '',
      image_count: '',
      patient_state: '',
      referral_count: '',
      video_count: '',
    },

    show: false,
    value: [],
    displayValue: '请选择出生日期',
    currentDate: new Date(1990, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    minDate: new Date(1900, 1, 1).getTime(),

    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    updateBool: true
  },
  chooseSex(event) {
    console.log("性别", event.detail)
    this.setData({
      ["submitUserInfo.sex"]: event.detail
    });
  },
  infoInput: function (e) {
    // console.log(e.detail)
    // console.log([e.currentTarget.id])
    this.setData({
      ["submitUserInfo." + e.currentTarget.id]: e.detail
    })
  },

  showPopup() {
    this.setData({
      show: true
    });
  },
  cancelDate() {
    this.setData({
      show: false
    });
  },
  confirmDate(e) {
    function pad(n) {
      return n < 10 ? '0' + n : n
    }
    var date = new Date(e.detail);
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var ymd = pad(year) + '-' + pad(month) + '-' + pad(day)
    console.log('selectDate选中的时间', ymd)

    this.setData({
      displayValue: ymd
    })
    this.setData({
      ["submitUserInfo.birthday"]: ymd
    })
    this.setData({
      show: false
    });
  },
  getBirth: function () {
    let that = this;
    let code = that.data.submitUserInfo.id_card
    console.log("身份证号码", code)
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code || !code.match(reg)) {
      Toast("身份证号格式错误");
      // console.log(1111);
      that.setData({
        updateBool: false
      })
      return
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11]
        if (last != code[17]) {
          Toast("身份证号输入有误");
          // console.log(222);
          that.setData({
            updateBool: false
          })
        } else {
          this.setData({
            updateBool: true,
          })
        }
      }
    }
    var date = new Date()
    var current_year = date.getFullYear()
    var birth = (code.length === 18) ? code.slice(6, 10) : ('19' + code.slice(6, 8));
    var age = current_year - Number(birth.join(''))
    age < 0 ? age = 0 : age
    that.setData({
      ["submitUserInfo.age"]: age
    })
    console.log("年龄", age)
    // var sex = (order % 2 === 0 ? 2 : 0);
  },

  updatePerInfo() {
    // return
    let that = this;
    console.log('准备提交的个人信息', this.data.submitUserInfo.nick_name)
    if (this.data.submitUserInfo.nick_name == '') {
      Toast("请输入您的昵称");
      return
    }
    if (this.data.submitUserInfo.username == '') {
      Toast("请输入您的真实姓名");
      return
    }
    if (this.data.submitUserInfo.id_card == '') {
      Toast("身份证号不能为空");
      return
    } else {
      if (this.data.updateBool == false) {
        Toast("请正确填写您的身份证号");
        return
      }
    }
    if (this.data.submitUserInfo.birthday == '') {
      Toast("请填写您的出生日期");
      return
    }
    if (this.data.submitUserInfo.age == '') {
      Toast("请填写您的年龄");
      return
    }
    console.log('提交信息参数', this.data.submitUserInfo, this.data.token);
    wx.request({
      url: 'https://hdmp.hdzyhosp.com/patient/update/',
      method: 'PUT',
      data: this.data.submitUserInfo,
      header: {
        'content-type': 'application/json',
        // 'content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + this.data.token
      },
      success(res) {
        console.log('提交个人信息的返回', res.data);
        if (res.data.detail == "修改成功") {
          Toast("修改成功")
          wx.setStorage({
            key: 'user_info',
            data: that.data.submitUserInfo,
            success() {
              wx.reLaunch({
                url: '/pages/account/account',
              })
            }
          })
        } else {
          Toast("修改失败")
        }
      },
      fail: function (res) {
        console.log('提交个人信息失败');
      }
    });
  },
  backToLogin() {
    wx.reLaunch({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'user_token',
      success(res) {
        console.log("从storage取得token", res.data.access_token)
        that.setData({
          token: res.data.access_token
        });
      }
    })
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        console.log('从storage取得的个人信息', res.data)
        // 存在个人信息的情况下
        if (!res.data.detail) {
          that.setData({
            submitUserInfo: res.data
          });
          that.setData({
            displayValue: res.data.birthday
          });
        } else {
          // 个人信息不存在的情况下
          console.log('个人信息不存在.');
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})