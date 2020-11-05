import Toast from '../../vant-dist/toast/toast';
import common from '../../utils/common';
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    openid:'',
    user_info: {},
    detail_info:{},
    order_info:{},
    doctor_info:{},

    template: '1v1',
    cloudenv: 'PRO',
    debugMode: false,

    status: 0, //录音播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
    // temp_audioPath: ''
  },
  recording(){
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.detail_info.voice_info
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  /* 开始播放 */
  play: function () {
    //status播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放

    //音频地址
    innerAudioContext.src = this.data.detail_info.voice_info
    //在ios下静音时播放没有声音，默认为true，改为false就好了。
    innerAudioContext.obeyMuteSwitch = false

    //点击播放
      console.log('开始播放')
      this.setData({ status: 1})
      innerAudioContext.play()
    // //播放结束
    innerAudioContext.onEnded((res) => {
      console.log('播放结束', res)
      this.setData({ status: 0})
      innerAudioContext.stop()
    })
  },
  /* 暂停播放 */
  pause: function () {
    //status播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
    innerAudioContext.onPause( (res) => {
      console.log('暂停播放', res)
      this.setData({ status: 2 })
    })
    innerAudioContext.pause()
  },
  /* 停止播放 */
  stop: function () {
    //status播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
    innerAudioContext.onStop((res) => {
      console.log('停止播放', res)
      this.setData({ 
        status: 0, 
        // temp_audioPath: res.tempFilePath,
        })
    })
    innerAudioContext.stop()
  },
  beginPay(){
    let that = this
    //订单提交
    wx.request({
      url: common.BaseUrl + common.PayUrl,
      method: "POST",
      data: {
        openid: that.data.openid,
        order_id: that.data.order_info.id,
        order_type: "question"
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
            const doctor_info = that.data.doctor_info
            doctor_info.order_time = that.data.order_time
            wx.reLaunch({
              url: '../order_success/order_success?doc_info=' + JSON.stringify(doctor_info),
            })
          },
          'fail': function (res) {
            Toast('支付失败，请重新支付')
            console.log("支付失败", res)
            // wx.reLaunch({
            //   url: '../find_doctor/find_doctor',
            // })
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
        that.setData({ token: res.data.access_token });
        const token = res.data.access_token
        console.log("订单详情页面取得token", res.data)
        wx.request({
          url: common.BaseUrl + common.ConsultOrderUrl + options.order_id + '/',
          method: "GET",
          header: {
            'content-type': 'application/json',
            "Authorization": 'Bearer ' + that.data.token
          },
          success(res) {
            that.setData({ detail_info: res.data.detail_info })
            that.setData({ order_info: res.data.order_info })
            that.setData({ doctor_info: res.data.order_info.doctor_info })
            console.log("订单详细内容", res.data)

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
    wx.getStorage({
      key: 'user_info',
      success(res) {
        console.log("订单页面获取用户信息", res.data)
        that.setData({ user_info: res.data });
      }
    })

    //获取openid
    wx.getStorage({
      key: 'id_cache',
      success(res) {
        that.setData({ openid: res.data.openid });
        console.log("取得openid", res.data.openid)
      }
    })
  },
  videoMeeting: function () {
    console.log("开始视频")
    const roomID = this.data.detail_info.room_number
    const nowTime = new Date()
    if (nowTime - this.tapTime < 1000) {
      return
    }
    if (!roomID) {
      wx.showToast({
        title: '请输入房间号',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (/^\d*$/.test(roomID) === false) {
      wx.showToast({
        title: '房间号只能为数字',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (roomID > 4294967295 || roomID < 0) {
      wx.showToast({
        title: '房间号取值范围为 1~4294967295',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    const url = `../room/room?roomID=${roomID}&template=${this.data.template}&debugMode=${this.data.debugMode}&cloudenv=${this.data.cloudenv}`
    if (this.data.order_info.business_state == '会诊完成') {
      Toast({
        message: '复诊已完成',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: url,
      })
    }

    this.setData({ 'tapTime': nowTime })
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})