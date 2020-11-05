// pages/user/writebasicinfo.js
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
    doctor_name:"",
    doctor_hospital: "",
    doctor_department: "",
    doctor_good_point: "",
    doctor_good_at: "",
    doctor_summary: "",
    departmentoption: [
      { text: '中医', value: "中医" },
      { text: '全科', value: "全科" },
      { text: '未知', value: "未知" }
    ]
  },

  doctornameInput: function (e) {
    this.setData({
      doctor_name: e.detail
    });
  },
  doctorhospitalInput: function (e) {
    this.setData({
      doctor_hospital: e.detail
    });
  },

  ondoctordepartmentChange: function (e) {
    this.setData({
      doctor_department: e.detail
    })
  },
  doctorgoodpointInput: function (e) {
    this.setData({
      doctor_good_point: e.detail
    });
  },
  doctorgoodatInput: function (e) {
    this.setData({
      doctor_good_at: e.detail
    });
  },
  doctorsummaryInput: function (e) {
    this.setData({
      doctor_summary: e.detail
    });
  },

  writeuserinfo: function (token) {
    var writeuserinfourl = con.BaseUrl + con.UpdateDoctorInfoUrl
    console.log("write userinfo url = " + writeuserinfourl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    let params = {
      "username": this.data.doctor_name,
      "hospital": this.data.doctor_hospital,
      "department": this.data.doctor_department,
      "good_point": this.data.doctor_good_point,
      "good_at": this.data.doctor_good_at,
      "summary": this.data.doctor_summary,
    }
    //console.log(params)
    axios.put(writeuserinfourl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('POST请求成功:', resp.data)
          wx.showModal({
            content: '您的资料将提交管理员审核，请收到审核通过的通知后登录，谢谢。',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: 'login',
                })
              } 
            }
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

  bindcancel: function () {
    //console.log(this.data.doctor_department)
    wx.reLaunch({
      url: 'login',
    })
  },

  bindsubmitdoctorinfo: function () {
    var that = this
    var token = ""
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        token = res.data;
        that.writeuserinfo(token)
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