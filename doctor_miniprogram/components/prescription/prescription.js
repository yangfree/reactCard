/**
 * 开具处方功能模块提取,因为在业务中反复使用
 *  name: prescription
 *  author: Jie.Yang
 *  date: 2020-06-19
 */

const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

Component({
  /**
   * 组件的属性列表
   */
  observers: {
    medicinelistdata: function () {
      console.log('medicinelistdata: 监听药品列表变化...');
    }
  },
  properties: {
    medicinelistdata: {
      type: Array,
      value: []
    },
    pid: {
      type: String,
      value: ''
    },
    patient_id: {
      type: String,
      value: ''
    },
    history_id: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    total_price: '',
    recipe_result: "",
    price_type: "其他号",
    loadingStatus: false,
    loadingText: '',
    medicationTem: false,
    medicationList: [],
    singleTotalPrice: '',
    medicineNum: 1,
    dayNum: 1,
    medicineUseful: [{
        name: '口服',
        code: 1
      },
      {
        name: '外用',
        code: 2
      },
    ],
    chooseIndex: 0,
    chooseCode: 1,
    openPrescription: true,
    lookPrescription: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击选择是口服还是外用
    _chooseUseful: function (e) {
      this.setData({
        chooseIndex: e.currentTarget.dataset.index,
        chooseCode: e.currentTarget.dataset.code
      })
    },
    // 获取多少付
    _getMedicineNum: function (e) {
      this.setData({
        medicineNum: e.detail.value
      })
    },

    // 获取每日多少次
    _getDayNum: function (e) {
      this.setData({
        dayNum: e.detail.value
      })
    },

    // 生成药方
    _createMedication: function () {
      if (this.data.medicinelistdata.length > 0) {
        this.setData({
          loadingStatus: true,
          loadingText: '药方生成中...',
          medicationTem: true
        })
        const mList = this.data.medicinelistdata.slice(0);
        const singlePrice = mList.reduce((prev, next) => {
          let price = Number(prev) + Number(next.medicine_price * next.medicine_num);
          return price;
        }, 0);
        this.setData({
          medicationList: mList,
          singleTotalPrice: singlePrice
        })
        console.log('药方模版: ', this.data.medicationTem);
        if (this.data.medicationTem) {
          this.setData({
            loadingStatus: false,
            loadingText: '',
          })
        }
      } else {
        wx.showToast({
          title: '请选择药品',
          icon: 'none',
          mask: true,
          duration: 1500
        })
      }

    },

    // 获取诊断结论
    _diagnosisInput: function (e) {
      this.setData({
        recipe_result: e.detail
      });
    },

    // 跳转添加药品
    _bindaddmedicine: function () {
      wx.navigateTo({
        url: '../treatment/medicinesearch'
      });
    },

    // 加减药品
    _onMedicineNumChange(e) {
      var index = e.currentTarget.dataset.key;
      var data = this.data.medicinelistdata
      data[index].medicine_num = e.detail
      this.setData({
        medicinelistdata: data,
      })
      console.log(e.detail);
    },

    // 预览
    _bindpreviewrecipel: function () {
      var total = 0
      for (var i = 0, len = this.data.medicinelistdata.length; i < len; i++) {
        total = total + this.data.medicinelistdata[i].medicine_price * this.data.medicinelistdata[i].medicine_num
      }
      total = total.toFixed(1)
      if (this.data.medicinelistdata.length < 1) {
        wx.showToast({
          title: '药品不能为空',
          icon: 'none'
        });
        return false;
      }
      if (this.data.recipe_result === '') {
        wx.showToast({
          title: '诊断结论不能为空',
          icon: 'none'
        });
        return false;
      }
      this.setData({
        total_price: total,
        openPrescription: false,
        lookPrescription: true,
      });
    },

    // 取消开发
    bindcancel: function () {
      wx.navigateBack()
    },
    /**
     * 处方预览方法
     */

    // 获取history_id
    _createhistory: function (recipelpic_id, patient_id, token) {
      var that = this
      var createhistoryurl = con.BaseUrl + con.CreatePrescriptionHistoryUrl
      createhistoryurl = createhistoryurl.replace("{patient_id}", patient_id)
      createhistoryurl = createhistoryurl.replace("{prep_id}", recipelpic_id)
      console.log("create history url = " + createhistoryurl)
      let config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
      let params = {
        history_content: '拍方抓药',
      }
      axios.post(createhistoryurl, params, config)
        .then(resp => {
          if (resp.status >= 200) {
            // console.log('POST请求成功:', resp.data)
            var history_id = resp.data.id
            that._createrecipel(history_id, token)
          } else {
            console.log('POST请求失败:', resp)
          }
        })
        .catch(error => {
          console.log('网络错误:', error);
        });
    },

    // 生成处方订单
    _createrecipel: function (history_id, token) {
      var that = this
      var createrecipelurl = con.BaseUrl + con.CreateRecipelUrl
      createrecipelurl = createrecipelurl.replace("{history_id}", history_id)
      // console.log("create recipel url = " + createrecipelurl)
      let config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
      let params = {
        total_price: that.data.total_price * that.data.medicineNum,
        recipe_result: that.data.recipe_result,
        price_type: that.data.price_type,
        medicine_list: that.data.medicinelistdata,
        nums: that.data.medicineNum,
        day_times: that.data.dayNum,
        usage: that.data.chooseCode,
      }
      // console.log('上传参数:', params);
      // console.log('url:', createrecipelurl);
      // console.log('头部:', config);
      axios.post(createrecipelurl, params, config)
        .then(resp => {
          if (resp.status >= 200) {
            // console.log('POST请求成功:', resp);
            wx.navigateBack({
              delta: 2
            })
          } else {
            // console.log('POST请求失败:', resp)
            wx.showToast({
              title: resp.data.detail,
              icon: 'none'
            })
          }
        })
        .catch(error => {
          console.log('网络错误:', error);
          wx.showToast({
            title: error,
            icon: 'none'
          })
        });
    },

    // 返回修改
    _bindmodifyrecipel: function () {
      this.setData({
        openPrescription: true,
        lookPrescription: false
      });
    },

    // 提交处方
    _bindconfirmrecipel: function () {
      var that = this
      var token = ""
      wx.getStorage({
        key: 'token',
        success: function (res) {
          token = res.data;
          // console.log('token = ' + res.data);
          // console.log(that.data.history_id);
          console.log(that.data.history_id!="");
          if (that.data.history_id!="") {
            that._createrecipel(that.data.history_id,token);
          } else {
            that._createhistory(that.data.pid, that.data.patient_id, token)
          }
        },
        fail: function (res) {
          console.log('failed: ' + JSON.stringify(res));
        }
      });
    },
  }
})