// pages/recipel/recipelpic.js
// pages/treatment/illnessdetail.js
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
    patient_id: "",
    patientname: "",
    patientphone: "",
    patientid_card: "",
    patientposition: "",
    patientsex: "",
    patientbirthday: "",
    illness: "",
    image1url: "",
    image2url: "",
    image3url: "",
    state: "",
    is_boiled: ""
  },


  getprescriptiondetail: function (token) {
    var that = this
    var prescriptiondetailurl = con.BaseUrl + con.GetPrescriptionDetailUrl
    prescriptiondetailurl = prescriptiondetailurl.replace("{id}", this.data.id)
    console.log("get prescription detail url = " + prescriptiondetailurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(prescriptiondetailurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          this.setData({
            patient_id: resp.data.patient_id,
            patientname: resp.data.patient_info.username,
            patientphone: resp.data.patient_info.phone,
            patientid_card: resp.data.patient_info.id_card,
            patientposition: resp.data.patient_info.position,
            patientsex: resp.data.patient_info.sex,
            patientbirthday: resp.data.patient_info.birthday,
            illness: resp.data.note,
            image1url: resp.data.image_one,
            image2url: resp.data.image_two,
            image3url: resp.data.image_three,
            state: resp.data.state,
            is_boiled: resp.data.is_boiled===1?'代煎':'不代煎'
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


  bindshowbigpic: function (e) {
    var url = e.currentTarget.dataset.key;
    console.log("image url= " + url)
    if (url) {
      wx.navigateTo({
        url: '../treatment/showpicture?url=' + url
      });
    } else {
      Toast("患者没有上传图片");
    }

  },

  // bindgoback: function () {
  //   wx.navigateBack()
  // },

  bindcreaterecipel:function(e){
    var patient_id = this.data.patient_id;
    console.log("patient id = " + patient_id)
    wx.redirectTo({
      url: 'createrecipel?patient_id=' + patient_id + '&id=' + this.data.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
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
        that.getprescriptiondetail(token)
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