import common from '../../utils/common';
import Dialog from '../../vant-dist/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // active:'account',
    token: '',

    user_info: {
      sex: '',
      age: '',
      username: '',
      id_card: '',
      nick_name: '',
      birthday: '',
      position: '',
      email: '',
      phone: '',

      id: '',
      image_count: '',
      patient_state: '',
      referral_count: '',
      video_count: ''
    },
    is_info_complete: false
  },
  backToLogin() {
    wx.reLaunch({
      url: '../login/login',
    })
  },
  backToUserinfo() {
    wx.navigateTo({
      url: '../user_info/user_info',
    })
  },
  // 提示信息
  address() {
    wx.redirectTo({
      url: "/pages/address_administration/address",
    })
  },
  // tabChange(event) {
  //   // console.log(event.detail)
  //   wx.redirectTo({
  //     url: '../' + event.detail + '/' + event.detail
  //   })
  // },
  logout() {
    wx.getStorage({
      key: 'user_token',
      success: function () {
        Dialog.confirm({
            title: '退出提示',
            message: '是否确认退出?'
          }).then(() => {
            wx.clearStorage({
              success() {
                wx.reLaunch({
                  url: '../homepage/homepage',
                })
              }
            })
          })
          .catch(err => {
            console.log(err);
          })
      },
      fail: function () {
        wx.showModal({
          title: '温馨提示:',
          content: '您还没有登陆,是否去登陆?',
          success: function (res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../login/login'
              })
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this
    // 如果storage里含有user_token这个key，不向后台发送request
    // 如果storage里不含user_token这个key, 再发起请求
    wx.getStorage({
      key: 'user_token',
      success(res) {
        that.setData({
          token: res.data.access_token
        });
        wx.request({
          url: common.BaseUrl + common.PatientInfoUrl,
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + that.data.token,
          },
          success(res) {
            if (res.statusCode == 401) {
              wx.reLaunch({
                url: '../login/login',
              })
            } else {
              console.log('返回的个人信息', res.data)
              if (res.data.detail) {
                wx.showModal({
                  title: '温馨提示:',
                  content: '请完善个人信息，体验更多服务内容',
                  success: function (res) {
                    if (res.confirm) {
                      wx.reLaunch({
                        url: '../user_info/user_info'
                      })
                    } else if (res.cancel) {
                      console.log('cancel');
                    }
                  }
                })
              } else {
                that.setData({
                  user_info: res.data
                });
                wx.setStorage({
                  key: 'user_info',
                  data: res.data,
                  success(res) {
                    console.log("存储成功", res)
                  }
                })
              }
            }
          }
        })
      }
    })
    //查看个人信息是否完整
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        // console.log("查看个人信息是否完整", res.data)
        let is_info_complete = res.data.age &&
          res.data.username &&
          res.data.id_card &&
          res.data.phone &&
          res.data.birthday &&
          res.data.nick_name
        if (is_info_complete == null) {
          // console.log('个人信息不完整');
          wx.showModal({
            title: '温馨提示:',
            content: '完善个人信息后才可以体验复诊预约服务,去完善信息?',
            success(res) {
              if (res.confirm) {
                // console.log('用户点击确定');
                // 跳转到完善个人信息页面
                wx.redirectTo({
                  url: '../user_info/user_info',
                })
              } else if (res.cancel) {
                // console.log('用户点击取消');
              }
            }
          })
          that.setData({
            is_info_complete: false
          })
        } else {
          that.setData({
            is_info_complete: true
          })
        }
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.getStorage({
    //   key: 'user_token',
    //   fail: function() {
    //     wx.reLaunch({
    //       url: '../login/login'
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});