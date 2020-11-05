// pages/treatment/recipelpreview.js
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
    history_id: "",
    medicinelistdata: [],
    recipe_result: "",
    price_type: "",
    total_price: 0
  },

  createrecipel: function (history_id, token) {
    var that = this
    var createrecipelurl = con.BaseUrl + con.CreateRecipelUrl
    createrecipelurl = createrecipelurl.replace("{history_id}", history_id)
    console.log("create recipel url = " + createrecipelurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      total_price: that.data.total_price,
      recipe_result: that.data.recipe_result,
      price_type: that.data.price_type,
      medicine_list: that.data.medicinelistdata,
    }
    console.log("recipel content = " + JSON.stringify(params))
    axios.post(createrecipelurl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('POST请求成功:', resp.data)
          wx.navigateBack({
            delta: 2
          })
        }
        else {
          console.log('POST请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },


  bindmodifyrecipel: function () {
    console.log("return to modify recipel")
    wx.navigateBack()
  },

  bindconfirmrecipel: function () {
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.createrecipel(that.data.history_id, token)
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
    var recipeldata = options.data
    console.log("get recipel data " + recipeldata)
    var params = JSON.parse(recipeldata)
    console.log('传递过来的参数', params);
    this.setData({
      history_id: params.history_id,
      recipe_result: params.recipe_result,
      price_type: params.price_type,
      medicinelistdata: params.medicine_list,
      total_price: params.total_price
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