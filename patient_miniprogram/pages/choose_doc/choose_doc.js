import common from '../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    doctor:'',
    datalist:[]
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  getDataList(){
    const that = this
    wx.request({
      url: common.BaseUrl + common.AllDoctorUrl + '?page_size=100',
      method: "GET",
      data: '',
      header: {
        // 'content-type': 'application/json'
        "content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res){
        console.log("返回的医生列表", res.data.results)
        that.setData({
          datalist: res.data.results
        })
      },
      fail(res){
        console.log("失败", res)
      }
    })
  },
  itemClick: function (e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    console.log("页面信息1",pages)
    console.log("页面信息2",e)
    prevPage.setData({
      doctor: e.currentTarget.dataset.docinfo,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取token,获取必要数据
    wx.getStorage({
      key: 'user_token',
      success(res) {
        that.setData({ token: res.data.access_token });
        const token = res.data.access_token
        console.log("find_doctor.js取得token", res.data)
        // 获取医生列表
        that.getDataList()
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