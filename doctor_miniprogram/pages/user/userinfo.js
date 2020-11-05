/**
 * 医生信息页面
 */
const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://meeting.tencent.com/s/Kaj977agzT8f",
    doctor_id: "",
    dortorimage: "",
    doctor_name: "",
    doctor_hospital: "",
    doctor_department: [],
    doctor_good_point: "",
    doctor_good_at: "",
    doctor_summary: "",
    ordertimelistdata: [],
    fileList: [],
    token: "",
    nextpageurl: "",
    // 添加科室
    departments: [{
        text: "中医儿科",
        value: 1,
        checked: false
      },
      {
        text: "中医妇科",
        value: 2,
        checked: false
      },
      {
        text: "中医男科",
        value: 3,
        checked: false
      },
      {
        text: "中医呼吸科",
        value: 4,
        checked: false
      },
      {
        text: "综合内科",
        value: 5,
        checked: false
      },
      {
        text: "风湿免疫科",
        value: 6,
        checked: false
      },
      {
        text: "中医骨伤科",
        value: 7,
        checked: false
      },
      {
        text: "肿瘤科",
        value: 8,
        checked: false
      },
      {
        text: "周围血管病科",
        value: 9,
        checked: false
      },
      {
        text: "肾病科",
        value: 10,
        checked: false
      },
      {
        text: "肾脾胃科",
        value: 11,
        checked: false
      },
    ],
    // 添加职称
    good_point: [{
        text: '主任医师',
        value: 1
      },
      {
        text: '副主任医师',
        value: 2
      },
      {
        text: '主治医师',
        value: 3
      },
      {
        text: '住院医师',
        value: 4
      },
    ],
    update_hospital: false,
    update_good_at: false,
    update_point: false,
    update_departmentint: false,
    pointIndex: 1,
    isThree: false
  },
  // 显示出编辑医院的框
  showEditHospital: function () {
    this.setData({
      update_hospital: true,
    })
  },
  // 获取编辑后的医院
  updateHospital: function (e) {
    this.setData({
      doctor_hospital: e.detail,
    })
  },
  // 显示擅长方向弹框
  showEditGoodAt: function () {
    this.setData({
      update_good_at: true,
    })
  },
  // 获取编辑后的擅长方向
  updateGoodAt: function (e) {
    this.setData({
      doctor_good_at: e.detail,
    })
  },
  // 显示选择职称
  showEditPoint: function () {
    this.setData({
      update_point: true
    })
  },
  // 选择职称 最多选择一个
  updatePoint: function (e) {
    // console.log(e.target.dataset.pointindex);
    let index = e.target.dataset.pointindex;
    this.setData({
      pointIndex: e.target.dataset.pointindex,
      doctor_good_point: this.data.good_point[index - 1]['text']
    })
  },
  // 显示科室
  showEditDepartment: function () {
    this.setData({
      update_departmentint: true,
    })
  },
  // 选择科室 最多三个
  updateDepartments: function (e) {
    let aIndex = e.currentTarget.dataset.selectindex;
    let checkArr = this.data.departments;
    // console.log(aIndex,e);
    // console.log(this.data.doctor_department.length);
    checkArr[aIndex].checked = !checkArr[aIndex].checked;
    if (this.data.isThree) {
      checkArr[aIndex].checked = "";
      // 刷新视图
      this.setData({
        departments: checkArr,
      })
      return false;
    } else {
      this.setData({
        departments: checkArr,
      })
    }
  },
  // 监控状态是否超过三个
  checkboxChange: function (e) {
    let checkValue = e.detail.value;
    if (checkValue.length > 3) {
      wx.showToast({
        title: '最多添加3项目',
        icon: 'none'
      })
      this.setData({
        isThree: true
      })
      return false;
    } else {
      this.setData({
        doctor_department: checkValue,
        isThree: false
      });
    }
    // console.log(this.data.checkValue,e);
  },
  // 关闭弹框
  closeUpdate: function () {
    this.setData({
      update_hospital: false,
      update_good_at: false,
      update_point: false,
      update_departmentint: false
    })
  },
  // 提醒信息
  alertMsg: function () {
    wx.showToast({
      title: '优化中,有疑问请联系运营李克诚.',
      duration: 3000,
      icon: 'none'
    })
  },
  // 获取医生信息
  getuserinfo: function (token) {
    var that = this
    var userinfourl = con.BaseUrl + con.GetDoctorInfoUrl
    // console.log("get user info url = " + userinfourl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    axios.get(userinfourl, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('GET请求成功:', resp.data)
          that.setData({
            doctor_id: resp.data.id,
            doctor_name: resp.data.username,
            dortorimage: resp.data.user_picture,
            doctor_hospital: resp.data.hospital,
            doctor_department: resp.data.department.split(','),
            doctor_good_point: resp.data.good_point,
            doctor_good_at: resp.data.field,
            doctor_summary: resp.data.summary,
          })
        } else {
          console.log('GET请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },

  // 更新医生头像
  updatadoctoricon: function (imageurl) {
    var that = this
    var writeuserinfourl = con.BaseUrl + con.UpdateDoctorInfoUrl
    console.log("write userinfo url = " + writeuserinfourl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      }
    }
    let params = {
      "user_picture": imageurl,
    }
    //console.log(params)
    axios.put(writeuserinfourl, params, config)
      .then(resp => {
        if (resp.status >= 200) {
          console.log('POST请求成功:', resp.data)
          that.getuserinfo(that.data.token)
        } else {
          console.log('POST请求失败:', resp)
        }
      })
      .catch(error => {
        console.log('网络错误:', error);
      });
  },

  // 上传医生头像
  uploaddoctorimage: function (event) {
    var that = this
    var uploadurl = con.BaseUrl + con.UploadImageUrl
    console.log("upload image url = " + uploadurl)
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: uploadurl,
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + that.data.token
          },
          filePath: tempFilePaths[0],
          name: 'image',
          success(res) {
            console.log("upload result = " + JSON.stringify(res))
            var imagedata = JSON.parse(res.data)
            var imageurl = imagedata.image_url
            that.updatadoctoricon(imageurl)
          }
        })
      }
    })
  },

  // 提交医生信息
  updateInfo: function () {
    const that = this;
    const updateUrl = con.BaseUrl + con.UpdateDoctorInfoUrl;
    const token = this.data.token;
    // console.log("get user info url = " + userinfourl)
    let config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    let params = {
      hospital: this.data.doctor_hospital,
      department: this.data.doctor_department.join(','),
      good_point: this.data.doctor_good_point,
      field: this.data.doctor_good_at
    }
    // console.log(params.department.join(','));
    // console.log(updateUrl, config, params);
    // return false;
    axios.put(updateUrl, params, config)
      .then(res => {
        if(res.status===200) {
          that.getuserinfo(token);
          wx.showToast({
            title: res.data.detail,
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      })
  },

  // 退出登陆
  bindlogout: function () {
    wx.showModal({
      content: '是否要退出?',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage({
            success: function () {
              wx.reLaunch({
                url: '../login/login',
              })
            }
          })
        } else if (res.cancel) {
          console.log('取消');
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
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
        that.getuserinfo(token)
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})