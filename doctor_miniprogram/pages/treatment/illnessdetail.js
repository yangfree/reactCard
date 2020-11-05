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
    patientname: "",
    patientphone: "",
    patientid_card: "",
    patientposition: "",
    patientsex: "",
    patientbirthday: "",
    illness:"",
    image1url:"",
    image2url: "",
    image3url: "", 
    //showplay:true,
    //showstop: false,
    innerAudioContext: null,
    status: 0, //录音播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
  },


  getillnessdetail: function (token) {
    var that = this
    var illnessdetailurl = con.BaseUrl + con.GetIllnessUrl
    illnessdetailurl = illnessdetailurl.replace("{id}", this.data.id)
    console.log("get illness detail url = " + illnessdetailurl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(illnessdetailurl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          this.setData({
            patientname: resp.data.base_info.username,
            patientphone: resp.data.base_info.phone,
            patientid_card: resp.data.base_info.id_card,
            patientposition: resp.data.base_info.position,
            patientsex: resp.data.base_info.sex,
            patientbirthday: resp.data.base_info.birthday,
            illness: resp.data.review_info.patient_main,
            image1url: resp.data.review_info.image_one,
            image2url: resp.data.review_info.image_two,
            image3url: resp.data.review_info.image_three,
            voice_info: resp.data.review_info.voice_info
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

/*
  bindplayaudio: function (e) {
    var audiourl = e.currentTarget.dataset.key;
    console.log("play audio url = " + audiourl)
    //audiourl = "https://hdmp.hdzyhosp.com:443/media/upload/file/tmp_3a932cc63f501086faf60b4caf66a38eee275faf97f5bf18.mp3"
    var urlend = audiourl.substr(audiourl.length - 3, 3) 
    if (urlend == "mp3"){
      this.data.innerAudioContext.src = audiourl;
      this.data.innerAudioContext.play();
      this.setData({
        showplay: false,
        showstop:true
      })
    }else{
      Toast("患者没有上传录音")
    }
  },

  bindstopaudio: function (e) {
    this.data.innerAudioContext.stop();
    this.setData({
      showplay: true,
      showstop: false
    })
  },
*/

  /* 开始播放 */
  play: function (e) {
    //status播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
    var audiourl = e.currentTarget.dataset.key;
    console.log("play audio url = " + audiourl)
    //audiourl = "https://hdmp.hdzyhosp.com:443/media/upload/file/tmp_3a932cc63f501086faf60b4caf66a38eee275faf97f5bf18.mp3"
    var urlend = audiourl.substr(audiourl.length - 3, 3)
    if (urlend == "mp3") {
      this.data.innerAudioContext.src = audiourl;
      this.data.innerAudioContext.obeyMuteSwitch = false    
      this.setData({
        status: 1,
      })
      this.data.innerAudioContext.play();
    } else {
      Toast("患者没有上传录音")
    }
  },
  /* 暂停播放 */
  pause: function () {
    //status播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
    this.data.innerAudioContext.onPause((res) => {
      console.log('暂停播放', res)
      this.setData({ status: 2 })
    })
    this.data.innerAudioContext.pause()
  },
  /* 停止播放 */
  stop: function () {
    //status播放状态 0:未播放 1:正在播放 2:暂停播放 3:已完成播放
    this.data.innerAudioContext.onStop((res) => {
      console.log('停止播放', res)
      this.setData({
        status: 0,
      })
    })
    this.data.innerAudioContext.stop()
  },

  bindshowbigpic: function (e) {
    var url = e.currentTarget.dataset.key;
    console.log("image url= " + url)
    if(url){
      wx.navigateTo({
        url: 'showpicture?url=' + url
      });
    }else{
      Toast("患者没有上传图片");
    }

  },

  // bindgoback: function(){
  //   wx.navigateBack()
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let innerAudioContext = wx.createInnerAudioContext()
    this.setData({
      id: options.id,
      innerAudioContext: innerAudioContext
    })
    this.data.innerAudioContext.onError((res) => {
      console.log('播放音频失败' + res);
      Toast("播放失败")
    })
    this.data.innerAudioContext.onEnded((res) => {
      console.log('播放结束' + res);
      this.setData({ status: 0 })
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
        that.getillnessdetail(token)
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
    this.data.innerAudioContext.stop()
    this.data.innerAudioContext.destroy();
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