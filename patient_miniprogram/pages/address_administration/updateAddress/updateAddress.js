import common from '../../../utils/common';
import Toast from '../../../vant-dist/toast/toast';

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
    id: '',
    token: '',
  },

  // 请求表单数据
  getAddress: function () {
    let url = common.BaseUrl + common.AddressUrl + this.data.id;
    let token = this.data.token;
    // console.log(this.data.id);
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      success: (res) => {
        if (/^2\d{2}/.test(res.statusCode)) {
          let item = JSON.parse(res.data.ext);
          this.setData({
            addressConfig: item
          })
          // console.log(item);
        } else {
          wx.showToast({
            title: res.data.detail,
            icon: 'none'
          })
        }
        wx.hideLoading();
        // console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  // 获取子组件的数据
  submitData: function (e) {
    // console.log(e.detail);
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
      Toast({
        message: '收货人不能为空'
      });
      return false;
    }
    if (phone === '') {
      Toast({
        message: '手机号不能为空'
      });
      return false;
    }
    if (city === '') {
      Toast({
        message: '所在地区不能为空'
      });
      return false;
    }
    if (country === '') {
      Toast({
        message: '详细地址不能为空'
      });
      return false;
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      Toast({
        message: "手机号码有误，请重填"
      });
      return false;
    }
    return true;
  },
  // 保存
  saveAddAress: function () {
    // console.log(this.checkAddressConfig());
    if (this.checkAddressConfig()) {
      let url = common.BaseUrl + common.AddressUrl + this.data.id + '/';
      let token = this.data.token;
      let params = JSON.stringify(this.data.addressConfig);
      wx.request({
        url: url,
        method: 'PUT',
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: {
          ext: params
        },
        success: function (res) {
          if (/^2\d{2}/.test(res.statusCode)) {
            wx.showToast({
              title: '保存成功',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.detail,
              icon: 'none'
            })
          }
          console.log(res);
        },
        fail: function (err) {
          wx.showToast({
            title: '请求错误',
            icon: 'none'
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      id: options.id
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
    wx.getStorage({
      key: 'user_token',
      success: (res) => {
        this.setData({
          token: res.data.access_token,
        })
        this.getAddress();
      },
      fail: (err) => {
        wx.navigateTo({
          url: '../../login/login',
        })
      }
    })
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