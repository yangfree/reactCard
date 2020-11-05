// pages/user/addordertime.js
const app = getApp();
const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor_id: "",
    weekdayarray: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    orderdate: [],
    weekday: "",
    starttime: "",
    endtime: "",
    datestring: "2020-01-01 ",
    weekdayshow: false,
    starttimeshow: false,
    endtimeshow: false,
    filter(type, options) {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0)
      }
      return options;
    }
  },


  addordertime: function (token) {
    var addordertimeurl = con.BaseUrl + con.OrderTimeUrl
    console.log("add ordertime url = " + addordertimeurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      week_day: this.data.weekday,
      start_time: this.data.datestring + this.data.starttime,
      end_time: this.data.datestring + this.data.endtime,
      owner: this.data.doctor_id
    }
    console.log("add ordertime param = " + JSON.stringify(params))
    axios.post(addordertimeurl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('POST请求成功:', resp.data)
          wx.navigateBack()
        }
        else {
          console.log('POST请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', JSON.stringify(error.response.data.detail));
        Toast(JSON.stringify(error.response.data.detail));
      });
  },

  showweekdayPopup() {
    this.setData({ weekdayshow: true });
  },

  onweekdayClose() {
    this.setData({ weekdayshow: false });
  },

  bindDateChange: function (e) {
    const { picker, value, index } = e.detail;
    this.setData({
      orderdate: value,
      weekdayshow: false,
      weekday: index+1
    })
  },

  showstarttimePopup() {
    this.setData({ starttimeshow: true });
  },

  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      starttime: e.detail,
      starttimeshow: false 
    })
  },

  bindStartTimeCancel: function(){
    this.setData({
      starttime: "",
      starttimeshow: false
    })
  },

  showendtimePopup() {
    this.setData({ endtimeshow: true });
  },

  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      endtime: e.detail,
      endtimeshow: false
    })
  },

  bindEndTimeCancel: function () {
    this.setData({
      endtime: "",
      endtimeshow: false
    })
  },

  bindcancel: function(){
    wx.navigateBack()
  },

  bindaddordertime: function () {
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.addordertime(token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      doctor_id: options.id,
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