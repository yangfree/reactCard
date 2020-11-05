// pages/user/ordertimelist.js
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
    ordertimelistdata:[],
    token: "",
    nextpageurl: "",
  },

  getordertimelist: function (token) {
    var that = this
    var ordertimelisturl = con.BaseUrl + con.OrderTimeUrl
    console.log("get ordertime list url = " + ordertimelisturl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(ordertimelisturl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            ordertimelistdata: resp.data.results,
            nextpageurl: resp.data.next
          })
        }
        else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', JSON.stringify(error) );
      });
  },

  getordertimenextlist: function (nexturl, token) {
    var that = this
    console.log("get order time next list url = " + nexturl)
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
          let currentdata = that.data.ordertimelistdata
          currentdata = currentdata.concat(resp.data.results)
          that.setData({
            ordertimelistdata: currentdata,
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

  bindupdateordertime: function(){
    wx.navigateTo({
      url: 'modifyordertime?id=' + this.data.doctor_id
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
        that.getordertimelist(token)
        that.setData({
          token: res.data
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
    console.log("onPullDownRefresh")
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.getordertimelist(token)
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
    console.log("onReachBottom")
    var that = this
    var token = ""
    if (this.data.nextpageurl) {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          console.log('token = ' + res.data);
          token = res.data;
          that.getordertimenextlist(that.data.nextpageurl, token)
        },
        fail: function (res) {
          console.log('failed: ' + JSON.stringify(res));
        }
      });
    } else {
      Toast('没有下一页了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})