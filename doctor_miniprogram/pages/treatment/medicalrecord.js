// pages/treatment/medicalrecord.js
const app = getApp();
const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import Toast from '@vant/weapp/toast/toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    diagdetail_id: "",
    patient_id: "",
    patientname: "",
    patientphone: "",
    patientid_card: "",
    patientposition: "",
    patientsex: "",
    patientbirthday: "",
    recipellistdata:[],
    nextpageurl: "",
  },

  bindgotorecipeldetail: function (e) {
    var record_id = e.currentTarget.dataset.key;
    var msg = e.currentTarget.dataset.msg;
    if(msg){
      wx.navigateTo({
        url: 'recipeldetail?id=' + record_id
      });
    }else{
      wx.showModal({
        content: '没有处方数据，请开具处方',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
    }

  },

  bindgotorecipelwrite: function (e) {
    var record_id = e.currentTarget.dataset.key;
    var recipel = e.currentTarget.dataset.msg;
    if (recipel){
      wx.showModal({
        content: '本操作会使此前开具的处方自动作废，是否继续？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'recipelwrite?history_id=' + record_id
            });
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: 'recipelwrite?history_id=' + record_id
      });      
    }

  },
  
  // bindgoback: function () {
  //   wx.navigateBack()
  // },

  bindgotomedicalrecordwrite: function (e) {
    var patient_id = this.data.patient_id;
    var diagdetail_id = this.data.diagdetail_id;
    console.log("patient id = " + patient_id)
    wx.navigateTo({
      url: 'medicalrecordwrite?patient_id=' + patient_id + '&diagdetail_id=' + diagdetail_id
    });
  },

  getmedicinerecord: function(token){
    var that = this
    var medicinerecordurl = con.BaseUrl + con.GetHistoryUrl
    medicinerecordurl = medicinerecordurl.replace("{patient_id}", this.data.patient_id)
    console.log("medicinerecordurl = " + medicinerecordurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(medicinerecordurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            patientname: resp.data.base_info.username,
            patientphone: resp.data.base_info.phone,
            patientid_card: resp.data.base_info.id_card,
            patientposition: resp.data.base_info.position,
            patientsex: resp.data.base_info.sex,
            patientbirthday: resp.data.base_info.birthday,
            recipellistdata: resp.data.results,
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


  getmedicinerecordnextlist: function (nextpageurl, token) {
    var that = this
    console.log("medicinerecordurl = " + nextpageurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(nextpageurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          let currentdata = that.data.recipellistdata
          currentdata = currentdata.concat(resp.data.results)
          that.setData({
            recipellistdata: currentdata,
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
    this.setData({
      patient_id: options.patient_id,
      diagdetail_id: options.treament_id
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
        that.getmedicinerecord(token)
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
        that.getmedicinerecord(token)
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
          that.getmedicinerecordnextlist(that.data.nextpageurl, token)
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