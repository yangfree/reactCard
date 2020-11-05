// components/person_info/person_info.wxml.js
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    // user_info: {
    //   type: Object,
    // },
    // level_img: {
    //   type: String
    // }
  },
  data: {
    user_info: {}
  },
  methods: {
    customMethod: function () {}
  },
  lifetimes: {
    attached: function () {
      let that = this
      // 在组件实例进入页面节点树时执行
      wx.getStorage({
        key: 'user_info',
        success(res) {
          // console.log("订单页面获取用户信息", res.data)
          if (!res.data.detail) {
            that.setData({
              user_info: res.data
            });
            if (res.data.level_info === '金卡会员') {
              that.setData({
                level_img: '/images/gold.png'
              });
            } else if (res.data.level_info === '银卡会员') {
              that.setData({
                level_img: '/images/silver.png'
              });
            } else if (res.data.level_info === '铜卡会员') {
              that.setData({
                level_img: '/images/copper.png'
              });
            } else {
              that.setData({
                level_img: ''
              });
            }
          }else {
            console.log(res.data.detail);
          }
        },
        fail(res) {
          console.log(res);
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})