// pages/recipel/recipel.js
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
    searchrecipel: "",
    recipeldata: [],
    nextpageurl: "",
  },

  searchInput: function (e) {
    // console.log("input search content")
    this.setData({
      searchrecipel: e.detail
    });
  },

  bindsearchrecipel: function (e) {
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log('token = ' + res.data);
        token = res.data;
        that.getrecipellist(e.detail, token)
      },
      fail: function (res) {
        // console.log('failed: ' + JSON.stringify(res));
      }
    });
  },


  bindgotorecipelpic: function (e) {
    var id = e.currentTarget.dataset.key;
    console.log("recipel pic id = " + id)
    wx.navigateTo({
      url: 'recipelpic?id=' + id
    });
  },

  bindgotorecipelcreate: function (e) {
    var id = e.currentTarget.dataset.key;
    var patient_id = e.currentTarget.dataset.patientid;
    console.log("prescription id = " + id)
    console.log("patient id = " + patient_id)
    wx.navigateTo({
      url: 'createrecipel?patient_id=' + patient_id + '&id=' + id
    });
  },

  bindgotorecipeldetail: function (e) {
    var history_id = e.currentTarget.dataset.key;
    console.log("history id = " + history_id)
    wx.navigateTo({
      url: '../treatment/recipeldetail?id=' + history_id
    });
  },

  getrecipellist: function (searchtext, token) {
    var that = this
    var recipellisturl = con.BaseUrl + con.GetPrescriptionListUrl + "?search=" + searchtext
    console.log("get recipel list url = " + recipellisturl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(recipellisturl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            recipeldata: resp.data.results,
            nextpageurl: resp.data.next
          })
        }
        else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },


  getrecipelnextlist: function (nexturl, token) {
    var that = this
    console.log("get recipel next list url = " + nexturl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(nexturl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          let currentdata = that.data.recipeldata
          currentdata = currentdata.concat(resp.data.results)
          that.setData({
            recipeldata: currentdata,
            nextpageurl: resp.data.next
          })
        }
        else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
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
        that.getrecipellist("", token)
        that.setData({
          searchrecipel: "",
        })
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
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.getrecipellist(that.data.searchrecipel, token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var token = ""
    if (this.data.nextpageurl) {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          console.log('token = ' + res.data);
          token = res.data;
          that.getrecipelnextlist(that.data.nextpageurl, token)
        },
        fail: function (res) {
          console.log('failed: ' + JSON.stringify(res));
        }
      });
    } else {
      Toast('没有更多数据了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})