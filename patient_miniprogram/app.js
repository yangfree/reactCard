App({
  globalData: {
    my_url: 'https://hdmp.hdzyhosp.com',
  },
  data:{
      appid:"wx355b0ef93ef23f9a",
      secret:"fab3b340e0d2964c2ba70908496c021e",
      js_code: '',
      expires_in:''//openid过期时间
  },
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //
    let that = this
    // 登录
                // 获取个人信息
                // wx.getUserInfo({
                //   success: function (res) {
                //     var objz = {};
                //     objz.avatarUrl = res.userInfo.avatarUrl;
                //     objz.nickName = res.userInfo.nickName;
                //     console.log("微信",res);
                //     wx.setStorageSync('wx_info',objz);//存储userInfo
                //   }
                // });
                
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
    // 视频通话模块
    const { model, system, statusBarHeight } = wx.getSystemInfoSync();
    var headHeight;
    if (/iphone\s{0,}x/i.test(model)) {
      headHeight = 88;
    } else if (system.indexOf('Android') !== -1) {
      headHeight = 68;
    } else {
      headHeight = 64;
    }
    this.globalData.headerHeight = headHeight;
    this.globalData.statusBarHeight = statusBarHeight;
  },
  globalData: {
    userInfo: null,
    headerHeight: 0,
    statusBarHeight: 0
  }
})