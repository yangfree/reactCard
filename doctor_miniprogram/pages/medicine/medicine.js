// pages/medicine/medicine.js
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
    firstsortlistdata: [],
    activeKey: 0,
    secondsortlistdata:[],
    thirdsortlistdata: [],
    firstsortid: "", 
    searmedicine: ""
  },


  getmedicinefirstsort: function (token) {
    var that = this
    var medicinefirstsorturl = con.BaseUrl + con.GetMedicineSortUrl
    medicinefirstsorturl = medicinefirstsorturl.replace("{type_level}", "one")
    console.log("get medicine first sort url = " + medicinefirstsorturl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(medicinefirstsorturl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            firstsortlistdata: resp.data,
            //firstsortid: resp.data[0].id
          });
          that.getmedicinesecondsort(resp.data[that.data.activeKey].id, token)
        }
        else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },


  getmedicinesecondsort: function (father_id, token) {
    var that = this
    var medicinesecondsorturl = con.BaseUrl + con.GetMedicineChildrenSortUrl
    medicinesecondsorturl = medicinesecondsorturl.replace("{father_id}", father_id)

    console.log("get medicine second sort url = " + medicinesecondsorturl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(medicinesecondsorturl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          this.setData({
            secondsortlistdata: resp.data,
          });
        }
        else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },


  bindChooseFirstSort: function(e){
    console.log("activeKey  = " + this.data.activeKey )
    var sort_id = e.currentTarget.dataset.key;
    console.log("choose sort id = " + sort_id)
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.getmedicinesecondsort(sort_id, token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
    
  },

  bindChooseThirdSort: function (e) {
    var sort_name = e.currentTarget.dataset.key;
    console.log("choose sort name = " + sort_name)
    wx.navigateTo({
      url: 'medicinelist?sort_name=' + sort_name + "&search="
    });

  },

  onFirstSortChange: function(e){
    console.log("activeKey  = " + this.data.activeKey)
    this.setData({
      activeKey : e.detail
    });
  },

  bindsearchmedicine: function (e) {
    wx.navigateTo({
      url: 'medicinelist?search=' + e.detail + "&sort_name="
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        that.getmedicinefirstsort(token)       
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