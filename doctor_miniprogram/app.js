/**
 * 小程序全局配置,页面找不到的时候跳转到复诊业务
 */
App({
  onPageNotFound(res) {
    wx.switchTab({
      url: '/pages/treatment/treatment',
    })
    console.log('页面找不到:', res);
  },
  onLaunch(options) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfos
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(options) {},
  onHide(options) {},
  onError(err) {
    console.log(err);
  },
  globalData: "I am a global data."
})