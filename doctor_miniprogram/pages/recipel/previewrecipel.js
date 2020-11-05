// pages/recipel/previewrecipel.js
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
    recipelpic_id: "",
    patient_id: "",
    history_id: "",
    medicinelistdata: [],
    recipe_result: "",
    price_type: "",
    total_price: 0,
    numbers: 1,
    usage: 1,
    day_times: 1
  },

  createhistory: function (recipelpic_id, patient_id, token) {
    var that = this
    var createhistoryurl = con.BaseUrl + con.CreatePrescriptionHistoryUrl
    createhistoryurl = createhistoryurl.replace("{patient_id}", patient_id)
    createhistoryurl = createhistoryurl.replace("{prep_id}", recipelpic_id)
    // console.log("create history url = " + createhistoryurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      history_content: '拍方抓药',
    }
    axios.post(createhistoryurl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          // console.log('POST请求成功:', resp.data)
          var history_id = resp.data.id
          that.createrecipel(history_id, token)
        } else {
          console.log('POST请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },

  createrecipel: function (history_id, token) {
    var that = this
    var createrecipelurl = con.BaseUrl + con.CreateRecipelUrl
    createrecipelurl = createrecipelurl.replace("{history_id}", history_id)
    // console.log("create recipel url = " + createrecipelurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      total_price: that.data.total_price*that.data.numbers,
      recipe_result: that.data.recipe_result,
      price_type: that.data.price_type,
      medicine_list: that.data.medicinelistdata,
      nums: that.data.numbers,
      day_times: that.data.day_times,
      usage: that.data.usage,
    }
    // console.log("recipel content = " + JSON.stringify(params));
    // console.log(config);
    axios.post(createrecipelurl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          // console.log('POST请求成功:', resp);
          wx.navigateBack({
            delta: 2
          })
        } else {
          // console.log('POST请求失败:', resp)
          wx.showToast({
            title: resp.data.detail,
            icon: 'none'
          })
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
        wx.showToast({
          title: error,
          icon: 'none'
        })
      });
  },


  bindmodifyrecipel: function () {
    // console.log("return to modify recipel")
    wx.navigateBack()
  },

  bindconfirmrecipel: function () {
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log('token = ' + res.data);
        token = res.data;
        that.createhistory(that.data.recipelpic_id, that.data.patient_id, token)
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
    // console.log("get recipel data " + recipeldata)
    var params = JSON.parse(recipeldata)
    console.log('传递过来的参数:', params);
    this.setData({
      recipelpic_id: params.id,
      patient_id: params.patient_id,
      history_id: params.history_id,
      recipe_result: params.recipe_result,
      price_type: params.price_type,
      medicinelistdata: params.medicine_list,
      total_price: params.total_price,
      numbers: params.nums,
      usage: params.usage,
      day_times: params.day_times
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