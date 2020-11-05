import common from '../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // active: 'order_list',
    token:'',
    search:'',

    option1: [
      { text: '全部订单', value: '全部订单' },
      { text: '复诊咨询订单', value: '复诊咨询订单' },
      { text: '药品处方订单', value: '药品处方订单' }
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ],
    value1: '全部订单',
    value2: 'a',

    tab_name:0,

    all_order_list:[],
    total_pages: 1,
    current_page:1,

    all_medicine_list:[],
    total_pages_medicine: 1,
    current_page_medicine: 1
  },
  // tabChange(event) {
  //   console.log(event.detail)
  //   wx.redirectTo({
  //     url: '../' + event.detail + '/' + event.detail
  //   })
  // },
  changeOrderType(event) {
    this.setData({ tab_name: event.detail.name })
  },
  //查看订单详情
  orderContent(e){
    console.log("查看详情按钮", e.currentTarget.dataset.orderid)
    const orderid = e.currentTarget.dataset.orderid
    if (e.currentTarget.dataset.ordertype == "复诊"){
      wx.navigateTo({
        url: '../order_consult/order_consult?order_id=' + orderid,
      })
    } else {
      wx.navigateTo({
        url: '../order_medicine/order_medicine?order_id=' + orderid,
      })
    }

  },
  //获取复诊订单列表
  getDataList(){
    let that = this
    wx.request({
      url: common.BaseUrl + common.ConsultOrderUrl + '?page='+ that.data.current_page,
      method: "GET",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        if (res.statusCode == 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          console.log("订单列表", res.data)
          var arr1 = that.data.all_order_list; //从data获取当前all_order_list数组
          var arr2 = res.data.results; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组
          that.setData({
            all_order_list: arr1 //合并后更新all_order_list
          })
          that.setData({
            total_pages: res.data.total_pages
          })
        }

      },
      fail(res) {
        console.log("订单列表返回失败", res)
      }
    })
  },
  //获取医药订单列表
  getMedicineList() {
    let that = this
    wx.request({
      url: common.BaseUrl + common.RecipeOrderUrl + '?page=' + that.data.current_page,
      method: "GET",
      header: {
        'content-type': 'application/json',
        "Authorization": 'Bearer ' + that.data.token
      },
      success(res) {
        if (res.statusCode == 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          console.log("医药订单列表", res.data)
          var arr1 = that.data.all_medicine_list; //从data获取当前all_medicine_list数组
          var arr2 = res.data.results; //从此次请求返回的数据中获取新数组
          arr1 = arr1.concat(arr2); //合并数组
          that.setData({
            all_medicine_list: arr1 //合并后更新all_medicine_list
          })
          that.setData({
            total_pages_medicine: res.data.total_pages
          })
        }

      },
      fail(res) {
        console.log("医药订单列表返回失败", res)
      }
    })
  },

  //筛选某种订单
  // filterConsultOrder(e) {
  //   return e.question_order_form == '复诊';
  // },
  // filterMedicineOrder(e) {
  //   return e.question_order_form == '药品';
  // },
  // changeOrderType(e){
  //   if (e.detail == "全部订单"){
  //     console.log("筛选1全部订单", this.data.all_order_list)
  //   } else if (e.detail == "复诊咨询订单"){
  //     console.log("筛选2复诊咨询订单", this.data.all_order_list.filter(this.filterConsultOrder))
  //   } else {
  //     console.log("筛选3药品处方订单", this.data.all_order_list.filter(this.filterMedicineOrder))
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'user_token',
      success(res) {
        that.setData({ token: res.data.access_token });
        console.log("订单页面取得token", res.data)
        //获取订单列表
        that.getDataList()
        that.getMedicineList()
      },
      fail(res){
        console.log("订单列表的token获取失败", res)        
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
    var that = this;
    console.log("上拉加载", that.data.tab_name)

    if (that.data.tab_name == 0) {
      var current_page = that.data.current_page + 1; //获取当前页数并+1
      if (current_page <= that.data.total_pages) {
        that.setData({
          current_page: current_page, //更新当前页数
        })
        that.getDataList();//重新调用请求获取下一页数据
      } else {
        wx.showToast({
          title: '没有新的数据了',
        })
      }
    } else if (that.data.tab_name == 1) {
      var current_page_medicine = that.data.current_page_medicine + 1; //获取当前页数并+1
      if (current_page_medicine <= that.data.total_pages_medicine) {
        that.setData({
          current_page_medicine: current_page_medicine, //更新当前页数
        })
        that.getMedicineList();//重新调用请求获取下一页数据
      } else {
        wx.showToast({
          title: '没有新的数据了',
        })
      }
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})