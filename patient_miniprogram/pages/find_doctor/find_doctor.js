// pages/find_doctor/find_doctor.js
import Toast from '../../vant-dist/toast/toast';
import common from '../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // active: 'find_doctor',
    doc_search: '',
    doc_list: [],
    token: '',
    is_info_complete: false,

    total_pages: 1,
    current_page: 1,
    protocolShow: true,
    showFiles: false
  },
  backToUserinfo() {
    wx.navigateTo({
      url: '../user_info/user_info',
    })
  },
  //搜索医生
  infoInput: function (e) {
    // console.log("搜索字段",e.detail)
    this.setData({
      doc_search: e.detail
    })
  },
  searchDoctor: function (temp) {
    let that = this;
    wx.request({
      url: common.BaseUrl + common.SearchDoctorUrl +
        '?search=' + that.data.doc_search + '&ordering=' + 'owner_username' + '&page=' + 1,
      method: "GET",
      data: '',
      header: {
        "content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        // console.log("搜索医生返回的信息", res.data)
        that.setData({
          doc_list: res.data.results
        })
      },
      fail: function (res) {
        console.log("搜索失败")
      }
    })
  },
  consult: function (e) {
    // console.log("传参数", e.currentTarget.dataset)
    const doc_info = e.currentTarget.dataset.docinfo
    wx.navigateTo({
      url: '../reservation_consult/reservation_consult?doc_info=' + JSON.stringify(doc_info),
    })
  },

  getDataList() {
    let that = this
    // console.log(common.BaseUrl + common.SearchDoctorUrl + '?page=' + that.data.current_page);
    // 获取医生列表
    wx.request({
      url: common.BaseUrl + common.SearchDoctorUrl + '?page=' + that.data.current_page,
      method: "GET",
      data: '',
      header: {
        // 'content-type': 'application/json'
        "content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        if (res.statusCode == 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          var arr1 = that.data.doc_list; //从data获取当前doc_list数组
          var arr2 = res.data.results; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2);
          that.setData({
            doc_list: arr1 //合并后更新doc_list
          })
          // console.log("医生", that.data.doc_list);
          that.setData({
            total_pages: res.data.total_pages
          })
          console.log("页面加载信息", that.data.doc_list)
          // console.log("页面加载信息", res.statusCode)
        }

      },
      fail: function (res) {
        console.log("加载失败")
      }
    })

  },

  // 协议取消跳转回到首页
  closeProtocol() {
    wx.reLaunch({
      url: '/pages/homepage/homepage'
    })
  },
  // 同意协议关闭提示
  confirmProtocol(res) {
    // console.log(res);
    this.setData({
      protocolShow: false
    })
  },
  // 跳转到协议页面
  goFiles() {
    console.log(1);
    wx.navigateTo({
      url: '../files/files',
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
        that.setData({
          token: res.data.access_token
        });
        const token = res.data.access_token
        // console.log("find_doctor.js取得token", res.data)
        // 获取医生列表
        that.getDataList()
      }
    })
    //查看个人信息是否完整
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        console.log("查看个人信息是否完整", res.data)
        if (res.data.detail) {
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
                that.setData({
                  showFiles: true
                })
              }
            }
          })
        } else {
          let is_info_complete = res.data.age &&
            res.data.username &&
            res.data.id_card &&
            res.data.phone &&
            res.data.birthday &&
            res.data.nick_name
          if (is_info_complete == null) {
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
                  that.setData({
                    showFiles: true
                  })
                }
              }
            })
            that.setData({
              is_info_complete: false
            })
          } else {
            // 信息完善后显示协议框
            that.setData({
              is_info_complete: true,
              showFiles: true
            })
          }
        }
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
    // console.log("上拉加载")
    var that = this;
    var current_page = that.data.current_page + 1; //获取当前页数并+1
    if (current_page <= that.data.total_pages) {
      that.setData({
        current_page: current_page, //更新当前页数
      })
      that.getDataList(); //重新调用请求获取下一页数据
    } else {
      Toast('没有新的数据了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})