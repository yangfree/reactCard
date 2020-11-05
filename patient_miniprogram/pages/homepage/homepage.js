import common from '../../utils/common';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // active: 'homepage',
    doc_name: '',
    articles: []
  },
  jumpDoctor: function () {
    wx.getStorage({
      key: 'user_token',
      success: function (token) {
        // console.log(token);
        wx.showLoading({
          title: '加载中...',
          success: function () {
            wx.switchTab({
              url: '/pages/find_doctor/find_doctor',
              fail: function (err) {
                console.log(err);
              },
              success: function () {
                wx.hideLoading({
                  fail: (err) => {
                    console.log(err);
                  },
                })
              }
            })
          }
        })
      },
      fail: function () {
        console.log('fail');
        wx.reLaunch({
          url: '../login/login'
        })
      }
    })
  },
  jumpPhoto: function () {
    wx.getStorage({
      key: 'user_token',
      success: function() {
        wx.showLoading({
          title: '加载中...',
          success: function () {
            wx.switchTab({
              url: '/pages/photo/photo',
              success: function () {
                wx.hideLoading({
                  fail: function (err) {
                    console.log(err);
                  }
                })
              },
              fail: function (err) {
                console.log(err);
              }
            })
          }
        })
      },
      fail: function() {
        wx.reLaunch({
          url: '../login/login'
        })
      }
    })
  },
  tempMedicine: function () {
    wx.showToast({
      title: '正在紧张上线中',
      duration: 2000
    })
  },
  toLogin: function (temp) {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  toArticle: function (e) {
    console.log("传参数", e.currentTarget.dataset)
    const article_info = e.currentTarget.dataset.articleinfo
    wx.navigateTo({
      url: '../message/message?article_info=' + JSON.stringify(article_info),
    })
  },
  // tabChange(event) {
  //   console.log(event.detail)
  //   wx.redirectTo({
  //     url: '../' + event.detail + '/' + event.detail
  //   })
  // },
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
        wx.request({
          url: common.BaseUrl + common.ArticleUrl,
          header: {
            'content-type': 'application/json',
            "Authorization": 'Bearer ' + that.data.token
          },
          success(res) {
            if (res.statusCode == 401) {
              wx.reLaunch({
                url: '../login/login',
              })
            } else {
              console.log("文章列表", res)
              that.setData({
                articles: res.data.results
              })
            }
          }
        })
      },
      fail: function(err) {
        console.log(err);
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
    wx.getStorage({
      key: 'user_token',
      fail: function() {
        wx.reLaunch({
          url: '../login/login'
        })
      }
    })
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