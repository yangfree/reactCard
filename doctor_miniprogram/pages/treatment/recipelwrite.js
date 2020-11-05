// pages/treatment/recipelwrite.js
// const app = getApp();
// const con = require('../../utils/const.js')
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history_id: "",
    // recipe_result:"",
    // price_type: "",
    medicinelistdata:[],
    addmedicinedata: null,
    // pricetypeoption: [
    //   { text: '医师号', value: "医师号" },
    //   { text: '其他号', value: "其他号" },
    // ]
  },

  // diagnosisInput: function (e) {
  //   this.setData({
  //     recipe_result: e.detail
  //   });
  // },

  // bindaddmedicine: function(){
  //   wx.navigateTo({
  //     url: 'medicinesearch'
  //   });
  // },

  // onMedicineNumChange(e) {
  //   var index = e.currentTarget.dataset.key;
  //   var data = this.data.medicinelistdata
  //   data[index].medicine_num = e.detail
  //   this.setData({
  //     medicinelistdata : data,
  //   })
  //   console.log(e.detail);
  // },

  // bindpreviewrecipel: function () {
  //   var total = 0
  //   for (var i = 0, len = this.data.medicinelistdata.length; i < len; i++)
  //   {
  //     total = total + this.data.medicinelistdata[i].medicine_price * this.data.medicinelistdata[i].medicine_num
  //   }
  //   total = total.toFixed(2)
  //   var recipeldata = {
  //     history_id: this.data.history_id,
  //     medicine_list: this.data.medicinelistdata,
  //     recipe_result: this.data.recipe_result,
  //     total_price: total,
  //     price_type: this.data.price_type
  //   }
  //   wx.navigateTo({
  //     url: 'recipelpreview?data=' + JSON.stringify(recipeldata) 
  //   });
  // },

  // onpricetypeChange(e) {
  //   this.setData({
  //     price_type: e.detail
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
      history_id: options.history_id
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
    if (this.data.addmedicinedata){
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