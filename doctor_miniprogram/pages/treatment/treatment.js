// pages/treatment/treatment.js
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
    template: '1v1',
    debugMode: false,
    cloudenv: 'PRO',
    evnArray: [
      { value: 'PRO', title: 'PRO' },
      { value: 'CCC', title: 'CCC' },
      { value: 'DEV', title: 'DEV' },
      { value: 'UAT', title: 'UAT' },
    ],
    searchtreament: "",
    treatmentdata:[],
    nextpageurl: "",
  },

  searchInput: function (e) {
    // console.log("input search content")
    this.setData({
      searchtreament: e.detail
    });
  },
  
  bindsearchtreament: function(e){
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        //that.gettreatmentlist(that.data.searchtreament, token)
        that.gettreatmentlist(e.detail, token)
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res));
      }
    });
  },

  bindgotorecord: function(e) {
    var patient_id = e.currentTarget.dataset.key;
    var id = e.currentTarget.dataset.id;
    console.log("patient id = " + patient_id)
    console.log("treament id = " + id)
    wx.navigateTo({
      url: 'medicalrecord?patient_id=' + patient_id + '&treament_id=' + id
    });
  },

  bindgotoillness: function (e) {
    var id = e.currentTarget.dataset.key;
    // console.log("treatment id = " + id)
    wx.navigateTo({
      url: 'illnessdetail?id=' + id
    });
  },

  bindgotovideotreatment: function (e) {
    var roomID = e.currentTarget.dataset.key;
    var ordertime = e.currentTarget.dataset.time;
    //console.log("room is = " + roomID)
    
    var nowTime = new Date().getTime();
    // console.log("nowTime is = " + nowTime)
    if (nowTime - this.tapTime < 1000) {
      return
    }


    ordertime = ordertime.replace(/-/g, "/");
    //console.log("ordertime is = " + ordertime)
    ordertime = Date.parse(ordertime);
    // console.log("ordertime is = " + ordertime)
    var timediff = (nowTime - ordertime) / 3600000
    console.log("timediff = " + timediff)
    if (nowTime < ordertime){
      wx.showModal({
        content: '未到预约时间，请稍候',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
    } else if (timediff > 6){
      wx.showModal({
        content: '预约时间已过',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
    }else{
      const url = `./videotreatment?roomID=${roomID}&template=${this.data.template}&debugMode=${this.data.debugMode}&cloudenv=${this.data.cloudenv}`
      wx.navigateTo({
        url: url,
      })
      this.setData({ 'tapTime': nowTime })
    }
  },

  bindgotovideoreplay: function () {
    Toast('当前没有回放视频，请稍候再看。');
    /*
    wx.navigateTo({
      url: 'videoreplay'
    });
    */
  },

  gettreatmentlist: function(searchtext, token){
    var that = this
    var treatmentlisturl = con.BaseUrl + con.TreatmentListUrl + "?search=" + searchtext
    console.log("get treatment list url = " + treatmentlisturl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(treatmentlisturl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            treatmentdata: resp.data.results,
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


  gettreatmentnextlist: function (nexturl, token) {
    var that = this
    console.log("get treatment next list url = " + nexturl)
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
          let currentdata = that.data.treatmentdata
          currentdata = currentdata.concat(resp.data.results)
          that.setData({
            treatmentdata: currentdata,
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
        that.gettreatmentlist("", token)
        that.setData({
          searchtreament: "",
        })
      },
      fail: function (res) {
        console.log('failed: ' + JSON.stringify(res) );
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
        that.gettreatmentlist(that.data.searchtreament, token)
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
    if(this.data.nextpageurl){
      wx.getStorage({
        key: 'token',
        success: function (res) {
          console.log('token = ' + res.data);
          token = res.data;
          that.gettreatmentnextlist(that.data.nextpageurl, token)
        },
        fail: function (res) {
          console.log('failed: ' + JSON.stringify(res));
        }
      });
    }else{
      Toast('没有更多数据了.');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})