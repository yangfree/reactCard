// pages/treatment/medicalrecordwrite.js
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
    patient_id: "",
    diagdetail_id: "",
    record:""
  },


  createmedicinerecord: function (token) {
    var that = this
    var createmedicinerecordurl = con.BaseUrl + con.CreateHistoryUrl
    createmedicinerecordurl = createmedicinerecordurl.replace("{patient_id}", this.data.patient_id)
    createmedicinerecordurl = createmedicinerecordurl.replace("{diagdetail_id}", this.data.diagdetail_id)
    console.log("createmedicinerecordurl = " + createmedicinerecordurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      id: that.data.patient_id,
      history_content: that.data.record
    }
    axios.post(createmedicinerecordurl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('POST请求成功:', resp.data)
        }
        else {
          console.log('POST请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },

  medicalRecordInput: function (e) {
    this.setData({
      record: e.detail
    });
  },
  bindcancel: function(){
    wx.navigateBack()
  },
  bindsubmitrecord: function () {
    var that = this
    var token = ""
    console.log("submit medical record" + this.data.record)
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.createmedicinerecord(token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
    
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patient_id: options.patient_id,
      diagdetail_id: options.diagdetail_id,
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