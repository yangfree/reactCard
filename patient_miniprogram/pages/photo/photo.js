// pages/photo/photo.js
import Toast from '../../vant-dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // active: 'photo',
    token: '',
    user_info: {},

    doctor: {
      username: '点此选择'
    },
    med_count: 1,
    fileList: [],
    imageList: [],
    notes: '',
    medicineStatus: false

  },
  // 改变是否代煎
  changeMedicineStatus: function () {
    this.setData({
      medicineStatus: !this.data.medicineStatus,
    })
  },
  //上传图片
  afterRead(event) {
    let that = this
    console.log("本地上传图片后返回1", event)
    const {
      file,
      name
    } = event.detail;
    const fileList = that.data.fileList;
    that.setData({
      fileList: fileList.concat(file)
    });
    console.log("本地上传所有图片的本地地址2", that.data.fileList)

    wx.uploadFile({
      url: 'https://hdmp.hdzyhosp.com/uploadimage/',
      filePath: that.data.fileList[0].path,
      name: 'image',
      header: {
        'content-type': 'multipart/form-data',
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        // 上传完成需要更新 fileList
        console.log("上传图片服务器返回的数据3", JSON.parse(res.data))
        var imageList = that.data.imageList;
        that.setData({
          imageList: imageList.concat([JSON.parse(res.data)])
        });
        console.log("上传的所有图片的服务器地址4", that.data.imageList)

      },
      fail(res) {
        console.log("上传图片返回数据失败", res)
      }
    });


  },
  delete(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data.fileList;
    const imageList = this.data.imageList;
    fileList.splice(index, 1);
    imageList.splice(index, 1);
    this.setData({
      fileList: fileList
    });
    this.setData({
      imageList: imageList
    });
  },
  clickPreview() {},
  //药品数量
  medCount(event) {
    console.log(event.detail);
    this.setData({
      med_count: event.detail
    })
  },
  // 备注信息
  noteInput: function (e) {
    this.setData({
      notes: e.detail
    })
  },
  //上传处方
  uploadPre: function (temp) {
    let that = this;
    console.log("选择医生:", typeof (that.data.doctor.id))
    console.log("上传图片:", that.data.imageList)
    console.log("药品数量:", that.data.med_count)
    console.log("备注信息:", that.data.notes)
    console.log("按钮状态:", that.data.medicineStatus);
    console.log('身份认证信息', that.data.token);
    if (that.data.doctor.username == '点此选择') {
      Toast('请选择一位医生')
      return
    }
    // if (that.data.imageList.length == 0) {
    //   Toast('请上传至少一张处方照片')
    //   return
    // }
    if (that.data.notes == false) {
      Toast('请填写备注信息')
      return
    }
    // 处理按钮状态
    let is_boiled = that.data.medicineStatus === false ? 0 : 1;
    wx.request({
      url: 'https://hdmp.hdzyhosp.com/diag/prescription/',
      method: "POST",
      data: {
        "doctor_id": that.data.doctor.id,
        "image_one": (that.data.imageList[0] == undefined) ? ('') : (that.data.imageList[0].image_url),
        "image_two": (that.data.imageList[1] == undefined) ? ('') : (that.data.imageList[1].image_url),
        "image_three": (that.data.imageList[2] == undefined) ? ('') : (that.data.imageList[2].image_url),
        "nums": that.data.med_count,
        "note": that.data.notes,
        "is_boiled": is_boiled
      },
      header: {
        // 'content-type': 'application/json'
        "content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        console.log("上传处方返回的数据", res)
        if (res.statusCode == 201) {
          Toast({
            message: '上传成功',
            onClose: () => {
              wx.reLaunch({
                url: '../homepage/homepage',
              })
            }
          })

        }
      },
      fail(res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取token,其他必要信息
    wx.getStorage({
      key: 'user_token',
      success(res) {
        that.setData({
          token: res.data.access_token
        });
        const token = res.data.access_token
        console.log("取得token", res.data)
      },
      fail: function (err) {
        console.log(err);
      }
    })
    //查看个人信息是否完整
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        console.log("查看个人信息是否完整", res.data)
        that.setData({
          user_info: res.data
        });
        let is_info_complete = res.data.age &&
          res.data.username &&
          res.data.id_card &&
          res.data.phone &&
          res.data.birthday &&
          res.data.nick_name
        if (is_info_complete == null) {
          that.setData({
            is_info_complete: false
          })
        } else {
          that.setData({
            is_info_complete: true
          })
        }
      },
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
    // wx.getStorage({
    //   key: 'user_token',
    //   fail: function () {
    //     wx.reLaunch({
    //       url: '../login/login'
    //     })
    //   }
    // })
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