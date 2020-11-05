import common from '../../utils/common';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    addressList: [],
  },

  // 跳转到添加地址
  addAress: function () {
    wx.navigateTo({
      url: './addAddress/addAddress',
    })
  },
  // 编辑地址
  updateAddress: function (e) {
    // console.log(e.target.dataset);
    let id = e.target.dataset.id;
    wx.navigateTo({
      url: `./updateAddress/updateAddress?id=${id}`,
    })
  },

  // 获取地址列表
  getAddressList: function () {
    let url = common.BaseUrl + common.AddressUrl + '?type=address';
    let token = this.data.token;
    // console.log(token);
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      success: (res) => {
        // console.log(/^2\d{2}/.test(res.statusCode));
        if (/^2\d{2}/.test(res.statusCode)) {
          if (res.data.count > 0) {
            let result = res.data.results;
            // console.log('处理之前:', result);
            result = result.map(item => {
              let resList = JSON.parse(item.ext);
              resList.id = item.id;
              return resList;
            })
            // console.log('处理之后:', result);
            this.setData({
              addressList: result
            })
          } else {
            wx.showToast({
              title: '你还没有地址,请添加.',
              duration: 2000,
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: res.data.detail,
            icon: 'none'
          })
        }
        // console.log(res);
      },
      fail: function (err) {
        wx.showToast({
          title: '请求错误',
          icon: 'none'
        })
      }
    })
  },

  // 删除地址
  deleteAddress: function (e) {
    let id = e.currentTarget.dataset.key;
    let that = this;
    if (this.data.addressList.length > 1) {
      wx.showModal({
        content: '确定删除此地址?',
        showCancel: true,
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            let url = common.BaseUrl + common.AddressUrl + id;
            let token = that.data.token;
            // console.log(token);
            wx.request({
              url: url,
              method: 'DELETE',
              header: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
              },
              success: function (res) {
                if (/^2\d{2}/.test(res.statusCode)) {
                  that.getAddressList();
                  wx.showToast({
                    title: '删除成功',
                    duration: 2000
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
          } else if (res.cancel) {
            console.log('我取消了');
          }
        },
        fail: function (err) {
          console.log(err);
        }
      })
    }else {
      wx.showToast({
        title: '最后一个奥,请添加后删除!',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'user_token',
    //   success: (res) => {
    //     this.setData({
    //       token: res.data.access_token,
    //     })
    //     this.getAddressList();
    //   },
    //   fail: (err) => {
    //     wx.navigateTo({
    //       url: '../../login/login',
    //     })
    //   }
    // })
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
        this.getAddressList();
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