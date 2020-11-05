// pages/medicine/medicinedetail.js
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
    medicine_id: "",
    officical_name: "",
    product_name: "",
    standard: "",
    price: "",
    product_source: "", 
    good_for: "",
    detail: "",
    product_image: "",
    type_one: "",
    type_two: "",
    type_three: "",
    typename: ""

  },

  getmedicinedetail: function (medicine_id, token) {
    var that = this
    var medicinedetailurl = con.BaseUrl + con.GetMedicineDetailUrl
    medicinedetailurl = medicinedetailurl.replace("{id}", medicine_id)
    console.log("get medicine detail = " + medicinedetailurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(medicinedetailurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            officical_name: resp.data.officical_name,
            product_name: resp.data.product_name,
            standard: resp.data.standard,
            price: resp.data.price,
            product_source: resp.data.product_source,
            good_for: resp.data.good_for,
            detail: resp.data.detail,
            product_image: resp.data.image_url[0],
            type_one: resp.data.type_one,
            type_two: resp.data.type_two,
            type_three: resp.data.type_three,
            typename: resp.data.type_one + "/" + resp.data.type_two + "/" + resp.data.type_three
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
    this.setData({
      medicine_id: options.id
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
        that.getmedicinedetail(that.data.medicine_id, token)
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