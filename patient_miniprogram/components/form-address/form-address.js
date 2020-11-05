// 地址列表组件
Component({
  // 接受传递过来的值
  properties: {
    addressData: {
      type: 'Object',
      value: {}
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    tagesChoose: [{
        text: '家'
      },
      {
        text: '公司'
      },
      {
        text: '学校'
      },
    ],
    itemIndex: 0
  },

  lifetimes: {
    attached: function () {
      // console.log(this.data.addressData);
    },
    detached: function () {},
  },

  methods: {
    submitData: function () {
      this.triggerEvent('submitData', this.data.addressData);
    },
    // 设置默认地址
    _changeDefaultAddress: function () {
      this.setData({
        'addressData.isdefault': !this.data.addressData.isdefault,
      })
    },

    // 选择标签
    _chooseTag: function (e) {
      this.setData({
        itemIndex: e.target.dataset.index,
        'addressData.tag': e.target.dataset.tag,
      })
    },

    // 获取收货人
    _getUsername: function (e) {
      this.setData({
        'addressData.username': e.detail,
      })
    },

    // 获取手机号
    _getPhone: function (e) {
      this.setData({
        'addressData.phone': e.detail,
      })
    },

    // 获取地址市县
    _getCity: function (e) {
      this.setData({
        'addressData.city': e.detail,
      })
    },

    // 获取定位信息
    _alertMsg: function () {
      wx.showToast({
        title: '正在开发中...',
        duration: 1500,
        icon: 'none'
      })
    },
    // 获取详细地址
    _getCountry: function (e) {
      this.setData({
        'addressData.country': e.detail,
      })
    },
  }
})