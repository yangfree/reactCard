// pages/user/modifyarticle.js
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
    id: "",
    title: "",
    content: ""
  },
  
  getarticle: function (id, token) {
    var that = this
    var articleurl = con.BaseUrl + con.ArticleDetailUrl
    articleurl = articleurl.replace("{id}", id)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    axios.get(articleurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            title: resp.data.title,
            content: resp.data.content
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

  modifyarticle: function (id, token) {
    var articleurl = con.BaseUrl + con.ArticleDetailUrl
    articleurl = articleurl.replace("{id}", id)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      title: this.data.title,
      content: this.data.content,
    }
    console.log("modify article param = " + JSON.stringify(params))
    axios.put(articleurl, params, config)
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
        Toast("修改文章失败");
      });
  },
  
  inputtitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  inputcontent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  
  bindcancel: function(){
    wx.navigateBack()
  },

  bindsubmit: function(){
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.modifyarticle(that.data.id, token)
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
      id: options.id
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
        that.getarticle(that.data.id, token)
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