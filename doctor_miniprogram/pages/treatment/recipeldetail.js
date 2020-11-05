// pages/treatment/recipeldetail.js
const app = getApp();
const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

Page({

  /**
   * 页面的初始数据
   */
  data: {
    medicinelistdata: [],
    recipe_result: "",
    price_type: "",
    total_price: "",
    history_id: "",
    day_times: 1,
    nums: 1,
    usage: 1
  },

  getrecipeldetail: function (history_id, token) {
    var that = this
    var recipeldetailurl = con.BaseUrl + con.GetRecipelUrl
    recipeldetailurl = recipeldetailurl.replace("{history_id}", history_id)
    console.log("recipel detail url = " + recipeldetailurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(recipeldetailurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          const {
            medicine_list,
            total_price,
            price_type,
            recipe_result,
            day_times,
            nums,
            usage
          } = resp.data;
          that.setData({
            medicinelistdata: medicine_list,
            total_price: total_price,
            price_type: price_type,
            recipe_result: recipe_result,
            day_times: day_times,
            nums,
            usage
          })
        } else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },

  // bindgoback: function () {
  //   wx.navigateBack()
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      history_id: options.id
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
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.getrecipeldetail(that.data.history_id, token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
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