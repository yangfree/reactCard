// pages/user/articlelist.js
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
    articlelistdata:[],
    token: "",
    nextpageurl: "",
    placeholder: ""
  },

  getarticlelist: function (token) {
    var that = this
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let theurl = con.BaseUrl + con.ArticleUrl
    //console.log("get article list url = " + articlelisturl)
    axios.get(theurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            articlelistdata: resp.data.results,
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

  getarticlenextlist: function (nexturl, token) {
    var that = this
    console.log("get article next list url = " + nexturl)
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
          let currentdata = that.data.articlelistdata
          currentdata = currentdata.concat(resp.data.results)
          that.setData({
            articlelistdata: currentdata,
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

  publisharticle: function(id, status, token){
    var that = this
    var articleurl = con.BaseUrl + con.ArticleDetailUrl
    articleurl = articleurl.replace("{id}", id)
    console.log("create article url = " + articleurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      article_state: status
    }
    console.log("create article param = " + JSON.stringify(params))
    axios.put(articleurl, params, config)
      .then(resp => {
        console.log('POST请求成功:', resp.data)
        that.getarticlelist(token)
      })
      .catch(error => {
        console.log('网络错误:', JSON.stringify(error.response.data.detail));
        Toast("发布失败");
      });
  },
  
  bindcreatenewarticle: function(){
    wx.navigateTo({
      url: 'createarticle'
    });
  },

  bindmodify: function(e){
    var id = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: 'modifyarticle?id=' + id
    });
  },

  binddetail: function(e){
    var id = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: 'articledetail?id=' + id
    });
  },

  bindpublish: function(e){
    var that = this
    var token = ""
    var id = e.currentTarget.dataset.key;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.publisharticle(id, "已发布", token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
  },

  
  bindrecall: function(e){
    var that = this
    var token = ""
    var id = e.currentTarget.dataset.key;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.publisharticle(id, "已撤回", token)
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
        that.getarticlelist(token)
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
        that.getarticlelist(token)
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
          that.getarticlenextlist(that.data.nextpageurl, token)
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