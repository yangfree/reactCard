// pages/order_success/order_success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info:{},
    doc_info:{}
  },
  orderConfirm(){
      wx.reLaunch({
          url: '../order_list/order_list',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log("预约页面传递的参数", JSON.parse(options.doc_info))
    //获取传递过来的医生信息
    var doc_info = JSON.parse(options.doc_info)
    that.setData({ doc_info: doc_info });
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        console.log('从storage取得的个人信息', res.data)
        that.setData({ user_info: res.data });
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