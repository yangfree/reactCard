// pages/video_test/video_test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    template: '1v1',
    cloudenv: 'PRO',
    debugMode: false,
    roomID: 1357

  },

  startVideo: function () {
    console.log('Video Start....')
    const url = `../room/room?roomID=${this.data.roomID}&template=${this.data.template}&debugMode=${this.data.debugMode}&cloudenv=${this.data.cloudenv}`
    wx.navigateTo({
      url: url,
    })
  },
})