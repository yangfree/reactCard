// pages/find_doctor/find_doctor.js
import Toast from '../../vant-dist/toast/toast';
import Dialog from '../../vant-dist/dialog/dialog';
import common from '../../utils/common';
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var init;
Page({

  /*页面的初始数据*/
  data: {
    token: '',
    openid: '',
    show: false,
    radio: '1',
    dateList: [],

    value: [],
    // displayValue: '请选择',
    // currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,

    day: [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ], //从周一到周日所有可选的时间段
    chooseDay: [''], //选定的某一天的所有 可选时间段 时分秒
    // ymd: '', 

    doc_info: {},
    patient_main: '',
    is_video: true,
    voice_info: "",
    order_time: "", //"2020-03-07 17:34:00",
    order_price: 0,
    image_one: "",
    image_two: "",
    image_three: "",

    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },

    fileList: [
      // { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1', isImage: true},
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    ],
    imageList: [],

    time: 0, //录音时长
    duration: 180000, //录音最大值ms 180000/3分钟
    status: 0, //录音状态 0:未开始录音 1:正在录音 2:暂停录音 3:已完成录音
    playStatus: 0, //录音播放状态 0:未播放 1:正在播放
    temp_audioPath: ''
  },

  // displayValue: '请选择',
  // showPopup() {
  //   this.setData({ show: true });
  // },
  cancelDate() {
    this.setData({
      show: false
    });
  },
  //首先选择日期
  selectDate(e) {
    // function pad(n) {
    //   return n < 10 ? '0' + n : n
    // }
    var date = new Date(e.detail);
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    // var ymd = pad(year) + '-' + pad(month) + '-' + pad(day)
    // console.log('selectDate选中的时间', ymd)

    var date = new Date(e.detail);
    var num = date.getDay() - 1

    // this.setData({
    //   displayValue: ymd
    // })
    // this.setData({
    //   ymd: ymd
    // })
    this.setData({
      chooseDay: this.data.day[num]
    })
    this.setData({
      show: false
    });
    console.log('selectDate时间段', this.data.day[num])
    //获取星期几
    // var date = new Date(e.detail.date);
    // var num = date.getDay() - 1

    // this.setData({ displayValue: e.detail.label})
    // this.setData({ ymd: e.detail.label})
    // this.setData({ chooseDay: this.data.day[num] })
    // console.log('selectDate chooseDay', this.data.day[num])
  },
  //然后选择时间段
  selectInterval(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
    console.log("单项选择", name)
    this.setData({
      order_time: name
    });
  },

  // 主诉
  mainInput: function (e) {
    this.setData({
      patient_main: e.detail
    })
    // console.log("主诉输入信息",this.data.patient_main)
  },

  //语音

  /* 开始录音 */
  start: function () {
    clearInterval(init) //清除定时器
    // 监听音频开始事件
    recorderManager.onStart((res) => {
      console.log('recorder start')
      this.setData({
        status: 1
      })
    })

    //监听录音自动结束事件(如果不加，录音时间到最大值自动结束后，没获取到录音路径将无法正常进行播放)
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      this.setData({
        temp_audioPath: res.tempFilePath,
        status: 3
      })
      this.recordingTimer(this.data.time)
    })

    const options = {
      duration: this.data.duration, //指定录音的时长，单位 ms
      sampleRate: 44100, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 192000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    this.recordingTimer()
    recorderManager.start(options)
  },

  /* 暂停录音 */
  pause: function () {
    recorderManager.onPause(() => {
      console.log('recorder pause')
      this.setData({
        status: 2
      })
    })
    this.recordingTimer(this.data.time)
    recorderManager.pause()
  },

  /* 继续录音 */
  continue_record: function () {
    this.setData({
      status: 1
    })
    this.recordingTimer()
    recorderManager.resume()
  },

  /* 停止录音 */
  stop: function () {
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      this.setData({
        temp_audioPath: res.tempFilePath,
        status: 3
      })
    })
    this.recordingTimer(this.data.time)
    recorderManager.stop()

  },

  /* 播放录音 */
  play: function () {
    //音频地址
    innerAudioContext.src = this.data.temp_audioPath
    //在ios下静音时播放没有声音，默认为true，改为false就好了。
    innerAudioContext.obeyMuteSwitch = false

    //点击播放
    if (this.data.playStatus == 0) {
      this.setData({
        playStatus: 1
      })
      innerAudioContext.play()
    }
    // //播放结束
    innerAudioContext.onEnded(() => {
      innerAudioContext.stop()
      this.setData({
        playStatus: 0
      })
    })
  },

  //录音计时器
  recordingTimer: function (time) {
    var that = this
    if (time == undefined) {
      //将计时器赋值给init
      init = setInterval(function () {
        var time = that.data.time + 1;
        that.setData({
          time: time
        })
      }, 1000);
    } else {
      clearInterval(init)
      console.log("暂停计时")
    }
  },
  /* 重新录制 */
  reset: function () {
    var that = this
    wx.showModal({
      title: "重新录音",
      content: "是否重新录制?",
      success(res) {
        if (res.confirm) {
          that.setData({
            time: 0, //录音时长
            temp_audioPath: "", //音频路径
            status: 0,
            playStatus: 0
          })
          innerAudioContext.stop()
        }
      }
    })
  },
  /* 上传录音 */
  uploadAudio() {
    let that = this;
    wx.uploadFile({
      url: common.BaseUrl + common.UploadImageUrl,
      filePath: that.data.temp_audioPath,
      name: 'file_path',
      header: {
        'content-type': 'multipart/form-data',
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        console.log("上传语音后服务器返回的数据", res)
        var data = JSON.parse(res.data)
        that.setData({
          voice_info: data.file_url
        });
        // console.log("上传的所有图片的服务器地址4", that.data.imageList)

      },
      fail(res) {
        console.log("上传语音数据失败", res)
      }
    });
  },

  //上传图片
  afterRead(event) {
    let that = this
    console.log("本地上传图片后返回1", event)
    const {
      file,
      name
    } = event.detail;
    // const fileList = this.data[`fileList${name}`];
    const fileList = that.data.fileList;
    that.setData({
      fileList: fileList.concat(file)
    });
    console.log("本地上传所有图片的本地地址2", that.data.fileList)

    wx.uploadFile({
      url: common.BaseUrl + common.UploadImageUrl,
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

  //提交预约信息
  beginPay: function () {
    let that = this;
    const params = {
      'patient_main': that.data.patient_main,
      "is_video": true,
      "voice_info": that.data.voice_info,
      "order_time": that.data.order_time,
      "order_price": that.data.order_price,
      // 用空字符串补齐数组
      "image_one": (that.data.imageList[0] == undefined) ? ('') : (that.data.imageList[0].image_url),
      "image_two": (that.data.imageList[1] == undefined) ? ('') : (that.data.imageList[1].image_url),
      "image_three": (that.data.imageList[2] == undefined) ? ('') : (that.data.imageList[2].image_url),
    }
    console.log('参数: ', params);
    console.log('url: ', common.BaseUrl + common.CreateDiagUrl + that.data.doc_info.id + '/');
    console.log('token: ', 'Bearer ' + that.data.token);
    wx.request({
      url: common.BaseUrl + common.CreateDiagUrl + that.data.doc_info.id + '/',
      method: "POST",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + that.data.token
      },
      data: params,
      success(res) {
        console.log("预约返回信息", res)
        // console.log(common.BaseUrl+common.PayUrl);
        //订单提交
        wx.request({
          url: common.BaseUrl + common.PayUrl,
          method: "POST",
          data: {
            openid: that.data.openid,
            order_id: res.data.order_id,
            order_type: "question"
          },
          header: {
            'content-type': 'application/json',
            "Authorization": 'Bearer ' + that.data.token
          },
          success(res) {
            console.log("发起支付返回信息", res.data)
            const pay_info = res.data
            wx.requestPayment({
              "appId": pay_info.appId,
              "package": pay_info.package,
              "nonceStr": pay_info.nonceStr,
              "timeStamp": pay_info.timeStamp,
              "paySign": pay_info.paySign,
              'signType': 'MD5',

              'success': function (res) {
                console.log("支付成功", res)
                const doc_info = that.data.doc_info
                doc_info.order_time = that.data.order_time
                wx.reLaunch({
                  url: '../order_success/order_success?doc_info=' + JSON.stringify(doc_info),
                })
              },
              'fail': function (res) {
                Toast('支付失败，请重新支付')
                wx.reLaunch({
                  url: '../order_list/order_list',
                })
                console.log("支付失败", res)
              }
            })
          },
          fail(res) {
            console.log("发起支付返回信息 失败", res)
          }
        })
      },
      fail: function (res) {
        console.log("预约失败")
      }
    })
  },
  reserve: function (temp) {
    let that = this;
    // console.log("主诉信息是否填写:", that.data.patient_main)
    // console.log("预约时间是否填写:", that.data.order_time)
    // console.log("预约价格是否填写:", that.data.order_price)
    // console.log("复诊图片是否上传:", that.data.imageList.length)
    // console.log("语音信息是否上传:", that.data.voice_info)
    if (that.data.order_time == '') {
      Toast('请选择预约时间')
      return
    }
    if (that.data.patient_main == false) {
      Toast('主诉信息不能为空')
      return
    }
    if (that.data.order_price == 0.00) {
      Toast('价格信息有误')
      return
    }
    if (that.data.imageList.length == 0) {
      Dialog.confirm({
        message: '您好，按照国家卫健委对线上复诊的要求，请您提交近期（三个月以内）的线下医疗机构相近科室诊断报告的照片，否则我们将无法为您提供线上复诊服务，如您执意继续支付，钱款恕不退还！',
        title: '友情提示',
        asyncClose: true
      }).then(() => {
        //执意付款
        Dialog.close();
        that.beginPay();
      }).catch(() => {
        //取消
        Dialog.close();
      });
    } else {
      that.beginPay();
    }

  },

  tabChange(event) {
    console.log(event.detail)
    wx.navigateTo({
      url: '../' + event.detail + '/' + event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log("上个页面传递的参数", JSON.parse(options.doc_info))

    //获取传递过来的医生信息
    var doc_info = JSON.parse(options.doc_info)
    that.setData({
      doc_info: doc_info
    });
    that.setData({
      order_price: doc_info.referral
    });
    //获取token,其他必要信息
    wx.getStorage({
      key: 'user_token',
      success(res) {
        that.setData({
          token: res.data.access_token
        });
        const token = res.data.access_token
        console.log("取得token", res.data)
        //获取当前医生的可预约时间段
        wx.request({
          url: common.BaseUrl + common.GetDoctorTimeUrl + doc_info.id + '/',
          // data: {},
          header: {
            'content-type': 'application/json',
            "Authorization": 'Bearer ' + token
          },
          success(res) {
            console.log("可预约时间段", res.data)
            that.data.dateList = res.data.results.map(item => {
              item.end_time = item.end_time.slice(10);
              return item;
            }).sort(function (a, b) {
              // console.log(Number(a.start_time.slice(8,11))-Number(b.start_time.slice(8,11)));
              let sortRes = Number(a.start_time.slice(8, 11)) - Number(b.start_time.slice(8, 11));
              return sortRes;
            })
            // console.log(that.data.dateList);
            that.setData({
              dateList: that.data.dateList,
            })
            // this.data.dateList = res.data.results;
            // const order_time = res.data.results
            // var monday = []
            // var tuesday = []
            // var wednesday = []
            // var thursday = []
            // var friday = []
            // var saturday = []
            // var sunday = []
            // for (var i = 0, len = order_time.length; i < len; i++) {
            //   // console.log(order_time[i])
            //   if (order_time[i].week_day == "周一") {
            //     monday.push(order_time[i])
            //   } else if (order_time[i].week_day == "周二") {
            //     tuesday.push(order_time[i])
            //   } else if (order_time[i].week_day == "周三") {
            //     wednesday.push(order_time[i])
            //   } else if (order_time[i].week_day == "周四") {
            //     thursday.push(order_time[i])
            //   } else if (order_time[i].week_day == "周五") {
            //     friday.push(order_time[i])
            //   } else if (order_time[i].week_day == "周六") {
            //     saturday.push(order_time[i])
            //   } else if (order_time[i].week_day == "周日") {
            //     sunday.push(order_time[i])
            //   } else {
            //     console.log("获取可预约时间出错")
            //   }
            // }
            // that.setData({
            //   day: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
            // })
          },
          fail(res) {
            console.log("获取预约时间段请求错误", res)
          }
        })
        //
      }
    })
    //获取openid
    wx.getStorage({
      key: 'id_cache',
      success(res) {
        that.setData({
          openid: res.data.openid
        });
        console.log("取得openid", res.data.openid)
      }
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