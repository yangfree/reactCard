// pages/address_administration/addAddress/addAddress.js
import common from '../../../utils/common';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressConfig: {
      username: '',
      phone: '',
      city: '',
      country: '',
      tag: '家',
      isdefault: false
    },
    token: ''
  },
  submitData: function (e) {
    this.setData({
      addressConfig: e.detail,
    })
  },
  // 校验函数
  checkAddressConfig: function () {
    const {
      username,
      phone,
      city,
      country
    } = this.data.addressConfig;
    if (username === '') {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none'
      });
      return false;
    }
    if (phone === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      });
      return false;
    }
    if (city === '') {
      wx.showToast({
        title: '所在地区不能为空',
        icon: 'none'
      });
      return false;
    }
    if (country === '') {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      });
      return false;
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none'
      });
      return false;
    }
    return true;
  },

  // 提交
  addAddAress: function () {
    if (this.checkAddressConfig()) {
      let url = common.BaseUrl + common.AddressUrl;
      let params = JSON.stringify(this.data.addressConfig);
      let token = this.data.token;
      // console.log(token);
      // console.log(JSON.stringify(this.data.addressConfig));
      wx.request({
        url: url,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: {
          ext: params,
          type: 'address'
        },
        success: function (res) {
          if (/^2\d{2}/.test(res.statusCode)) {
            wx.navigateTo({
              url: '../address',
            })
          } else {
            wx.showToast({
              title: res.data.detail,
              icon: 'none'
            })
          }
        },
        fail: function (err) {
          console.log(err);
        }
      })
      // console.log('提交信息', this.data.addressConfig);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    wx.getStorage({
      key: 'user_token',
      success: (res) => {
        this.setData({
          token: res.data.access_token,
        })
      },
      fail: (err) => {
        wx.navigateTo({
          url: '../../login/login',
        })
      }
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