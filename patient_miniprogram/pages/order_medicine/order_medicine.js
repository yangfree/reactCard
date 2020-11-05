import Toast from '../../vant-dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    user_info: {},
    order_info: {},
    medicine_info: [],
    recipe_info: {
      day_times: 1,
      nums: 1,
      recipe_result: '',
      usage: 1,
      update_time: ''
    },

  },
  beginPay: function () {
    let that = this;
    wx.request({
      url: 'https://hdmp.hdzyhosp.com/order/pay/',
      method: "POST",
      data: {
        openid: that.data.openid,
        order_id: that.data.order_info.id,
        order_type: "medicine"
      },
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        console.log("发起支付返回信息", res.data)
        const pay_info = res.data
        wx.requestPayment({

          "appId": pay_info.appId,
          "package": pay_info.package,
          "nonceStr": pay_info.nonceStr,
          "timeStamp": pay_info.timeStamp,
          "paySign": pay_info.paySign,
          'signType': 'MD5',

          'success': function (res) {
            console.log("支付成功", res)

            wx.reLaunch({
              url: '../order_list/order_list',
            })


          },
          'fail': function (res) {
            console.log("支付失败", res)
            wx.reLaunch({
              url: '../order_list/order_list',
            })
          }
        })
      },
      fail(res) {
        console.log("发起支付返回信息 失败", res)
      }
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
        that.setData({
          token: res.data.access_token
        });
        const token = res.data.access_token
        // console.log("订单详情页面取得token", res.data)
        wx.request({
          url: 'https://hdmp.hdzyhosp.com/order/recipe/' + options.order_id + '/',
          method: "GET",
          header: {
            'content-type': 'application/json',
            "Authorization": 'Bearer ' + that.data.token
          },
          success(res) {
            console.log("订单详细内容", res.data)
            that.setData({
              order_info: res.data,
              medicine_info: res.data.medicine_info,
            })
            if (res.data.recipe_info) {
              const {
                day_times,
                nums,
                recipe_result,
                usage,
                update_time
              } = res.data.recipe_info;
              that.setData({
                ['recipe_info.day_times']: day_times,
                ['recipe_info.nums']: nums,
                ['recipe_info.recipe_result']: recipe_result,
                ['recipe_info.usage']: usage,
                ['recipe_info.update_time']: update_time,
              })
            }
          },
          fail(res) {
            console.log("订单详细内容 返回失败", res)
          }
        })
      },
      fail(res) {
        console.log("订单列表的token获取失败", res)
      }

    })
    //获取用户信息
    wx.getStorage({
      key: 'user_info',
      success(res) {
        console.log("订单页面获取用户信息", res.data)
        that.setData({
          user_info: res.data
        });
      }
    })
    //获取openid
    wx.getStorage({
      key: 'id_cache',
      success(res) {
        that.setData({
          openid: res.data.openid
        });
        // console.log("取得openid", res.data.openid)
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
  onReachBottom: function (e) {
    // console.log("上拉触底",e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})