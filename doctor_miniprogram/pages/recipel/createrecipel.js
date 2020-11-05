// pages/recipel/createrecipel.js
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
    id: "",
    patient_id: "",
    // recipe_result: "",
    // price_type: "其他号",
    medicinelistdata: [],
    addmedicinedata: null,
    // loadingStatus: false,
    // loadingText: '',
    // medicationTem: false,
    // medicationList: [],
    // singleTotalPrice: '',
    // medicineNum: 1,
    // dayNum: 1,
    // medicineUseful: [{
    //     name: '口服',
    //     code: 1
    //   },
    //   {
    //     name: '外用',
    //     code: 2
    //   },
    // ],
    // chooseIndex: 0,
    // chooseCode: 1,
  },

  // // 点击选择是口服还是外用
  // chooseUseful: function (e) {
  //   this.setData({
  //     chooseIndex: e.currentTarget.dataset.index,
  //     chooseCode: e.currentTarget.dataset.code
  //   })
  //   // console.log(e.currentTarget.dataset);

  // },
  // // 获取多少付
  // getMedicineNum: function (e) {
  //   // console.log(e.detail.value);
  //   this.setData({
  //     medicineNum: e.detail.value
  //   })
  // },

  // // 获取每日多少次
  // getDayNum: function (e) {
  //   this.setData({
  //     dayNum: e.detail.value
  //   })
  // },

  // // 生成药方
  // createMedication: function () {
  //   // console.log('生成药方', this.data.medicinelistdata);
  //   if (this.data.medicinelistdata.length > 0) {
  //     this.setData({
  //       loadingStatus: true,
  //       loadingText: '药方生成中...',
  //       medicationTem: true
  //     })
  //     const mList = this.data.medicinelistdata.slice(0);
  //     const singlePrice = mList.reduce((prev, next) => {
  //       let price = Number(prev) + Number(next.medicine_price * next.medicine_num);
  //       return price;
  //     }, 0);
  //     // console.log(mList);
  //     this.setData({
  //       medicationList: mList,
  //       singleTotalPrice: singlePrice
  //     })
  //     console.log('药方模版: ', this.data.medicationTem);
  //     if (this.data.medicationTem) {
  //       this.setData({
  //         loadingStatus: false,
  //         loadingText: '',
  //       })
  //     }
  //   } else {
  //     wx.showToast({
  //       title: '请选择药品',
  //       icon: 'none',
  //       mask: true,
  //       duration: 1500
  //     })
  //   }

  // },
  // // 修改药方
  // editMedication: function () {
  //   console.log('修改药方');
  // },
  // diagnosisInput: function (e) {
  //   this.setData({
  //     recipe_result: e.detail
  //   });
  // },

  // bindaddmedicine: function () {
  //   wx.navigateTo({
  //     url: '../treatment/medicinesearch'
  //   });
  // },

  // onMedicineNumChange(e) {
  //   var index = e.currentTarget.dataset.key;
  //   var data = this.data.medicinelistdata
  //   data[index].medicine_num = e.detail
  //   this.setData({
  //     medicinelistdata: data,
  //   })
  //   console.log(e.detail);
  // },

  // bindpreviewrecipel: function () {
  //   var total = 0
  //   for (var i = 0, len = this.data.medicinelistdata.length; i < len; i++) {
  //     total = total + this.data.medicinelistdata[i].medicine_price * this.data.medicinelistdata[i].medicine_num
  //   }
  //   total = total.toFixed(1)
  //   var recipeldata = {
  //     id: this.data.id,
  //     patient_id: this.data.patient_id,
  //     history_id: this.data.history_id,
  //     medicine_list: this.data.medicinelistdata,
  //     recipe_result: this.data.recipe_result,
  //     total_price: total,
  //     price_type: this.data.price_type,
  //     day_times: this.data.dayNum,
  //     usage: this.data.chooseCode,
  //     nums: this.data.medicineNum,
  //   }
  //   // console.log(recipeldata);
  //   if (recipeldata.medicine_list === []) {
  //     wx.showToast({
  //       title: '药品不能为空',
  //       icon: 'none'
  //     });
  //     return false;
  //   }
  //   if (recipeldata.recipe_result === '') {
  //     wx.showToast({
  //       title: '诊断结论不能为空',
  //       icon: 'none'
  //     });
  //     return false;
  //   }
  //   if (recipeldata.total_price === '0.00') {
  //     wx.showToast({
  //       title: '药品价格不能为0元',
  //       icon: 'none'
  //     });
  //     return false;
  //   }
  //   wx.navigateTo({
  //     url: 'previewrecipel?data=' + JSON.stringify(recipeldata)
  //   });
  // },

  // bindcancel: function () {
  //   wx.navigateBack()
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patient_id: options.patient_id,
      id: options.id
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
    //console.log("in recipel write page history_id = " + this.data.history_id)
    var listdata = this.data.medicinelistdata
    if (this.data.addmedicinedata) {
      listdata.push(this.data.addmedicinedata)
      console.log("medicine list =" + JSON.stringify(listdata))
      this.setData({
        medicinelistdata: listdata,
        addmedicinedata: null
      })
    }

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