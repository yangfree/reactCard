import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    /* 共享页面 */
    {
      path: '/',
      name: '',
      redirect: '/login',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
      name: '',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/404',
      component: () => import('@/components/404.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/password',
      component: () => import('@/components/ChangePassword.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/home',
      component: () => import('@/components/Home.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/help',
      component: () => import('@/components/Help.vue'),
      name: '',
      hidden: true
    },
    /* ***** */
    /* 手机端 */
    {
      path: '/mobile',
      component: () => import('@/components/MobileHome.vue'),
      name: '',
      hidden: true,
      children: [
        {
          path: '/mobile/prj001',
          name: 'Prj001手机端',
          component: () => import('@/components/prj001/mobile/MobilePrj001.vue'),
        },
        {
          path: '/mobile/prj002',
          name: 'Prj002手机端',
          component: () => import('@/components/prj002/mobile/MobilePrj002.vue'),
        },
        {
          path: '/mobile/prj003',
          name: 'Prj003手机端',
          component: () => import('@/components/prj003/mobile/MobilePrj003.vue'),
        },
        {
          path: '/mobile/prj004',
          name: 'Prj004手机端',
          component: () => import('@/components/prj004/mobile/MobilePrj004.vue'),
        },
        {
          path: '/mobile/prj005',
          name: 'Prj005手机端',
          component: () => import('@/components/prj005/mobile/MobilePrj005.vue'),
        },
        {
          path: '/mobile/prj006',
          name: 'Prj006手机端',
          component: () => import('@/components/prj006/mobile/MobilePrj006.vue'),
        }
      ]
    },
    /* 各项目入口 */
    {
      path: '/prj001',
      component: () => import('@/components/prj001/Prj001.vue'),
      name: '排卵障碍性异常子宫出血',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj001/table',
          name: '数据列表',
          component: () => import('@/components/prj001/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj001/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj001/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj001/echarts',
          name: '数据分析',
          component: () => import('@/components/prj001/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj001/about',
          name: '关于',
          component: () => import('@/components/prj001/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }
      ]
    },
    {
      path: '/prj002',
      component: () => import('@/components/prj002/Prj002.vue'),
      name: '多囊卵巢综合征',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj002/table',
          name: '数据列表',
          component: () => import('@/components/prj002/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj002/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj002/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj002/echarts',
          name: '数据分析',
          component: () => import('@/components/prj002/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj002/about',
          name: '纳入标准与排除标准',
          component: () => import('@/components/prj002/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }

      ]
    },
    {
      path: '/prj003',
      component: () => import('@/components/prj003/Prj003.vue'),
      name: '原发性痛经',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj003/table',
          name: '数据列表',
          component: () => import('@/components/prj003/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj003/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj003/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj003/echarts',
          name: '数据分析',
          component: () => import('@/components/prj003/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        }
      ]
    },
    {
      path: '/prj004',
      component: () => import('@/components/prj004/Prj004.vue'),
      name: '滑胎（复发性流产）',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj004/table',
          name: '数据列表',
          component: () => import('@/components/prj004/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj004/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj004/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj004/echarts',
          name: '数据分析',
          component: () => import('@/components/prj004/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        }
      ]
    },
    {
      path: '/prj005',
      component: () => import('@/components/prj005/Prj005.vue'),
      name: '盆腔炎性疾病及其后遗症',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj005/table',
          name: '数据列表',
          component: () => import('@/components/prj005/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj005/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj005/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj005/echarts',
          name: '数据分析',
          component: () => import('@/components/prj005/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj005/about',
          name: '关于',
          component: () => import('@/components/prj005/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }

      ]
    },
    {
      path: '/prj006',
      component: () => import('@/components/prj006/Prj006.vue'),
      name: '子宫内膜异位症及子宫腺肌病诊疗现状流行病学调查',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj006/table',
          name: '数据列表',
          component: () => import('@/components/prj006/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj006/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj006/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj006/echarts',
          name: '数据分析',
          component: () => import('@/components/prj006/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj006/about',
          name: '关于',
          component: () => import('@/components/prj006/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }

      ]
    },
    {
      path: '/prj007',
      component: () => import('@/components/prj007/Prj007.vue'),
      name: '子宫肌瘤',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj007/table',
          name: '数据列表',
          component: () => import('@/components/prj007/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        // {
        //   path: '/prj007/QRcode',
        //   name: '移动端录入',
        //   component: () => import('@/components/prj006/pages/QRcode.vue'),
        //   iconCls: 'fa fa-qrcode fa-lg',
        //   leaf: false
        // },
        // {
        //   path: '/prj007/echarts',
        //   name: '数据分析',
        //   component: () => import('@/components/prj006/pages/Echarts.vue'),
        //   iconCls: 'fa fa-bar-chart fa-lg',
        //   leaf: false
        // },
        // {
        //   path: '/prj007/about',
        //   name: '关于',
        //   component: () => import('@/components/prj006/pages/About.vue'),
        //   iconCls: 'fa fa-tag fa-lg',
        //   leaf: false
        // }
      ]
    },
    {
      path: '/prj008',
      component: () => import('@/components/prj008/Prj008.vue'),
      name: '先兆流产',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj008/table',
          name: '数据列表',
          component: () => import('@/components/prj008/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj008/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj008/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj008/echarts',
          name: '数据分析',
          component: () => import('@/components/prj008/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj008/about',
          name: '关于',
          component: () => import('@/components/prj008/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }
      ]
    },
    {
      path: '/prj00g',
      component: () => import('@/components/prj00g/Prj00g.vue'),
      name: '子宫肌瘤诊疗现状调查问卷',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj00g/table',
          name: '数据列表',
          component: () => import('@/components/prj00g/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj00g/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj00g/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj00g/echarts',
          name: '数据分析',
          component: () => import('@/components/prj00g/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj00g/about',
          name: '关于',
          component: () => import('@/components/prj00g/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }
      ]
    },
    {
      path: '/prj009',
      component: () => import('@/components/prj009/Prj009.vue'),
      name: '早发性卵巢功能不全',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        {
          path: '/prj009/table',
          name: '数据列表',
          component: () => import('@/components/prj009/pages/Table.vue'),
          iconCls: 'fa fa-home fa-lg',
          leaf: false
        },
        {
          path: '/prj009/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj009/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode fa-lg',
          leaf: false
        },
        {
          path: '/prj009/echarts',
          name: '数据分析',
          component: () => import('@/components/prj009/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart fa-lg',
          leaf: false
        },
        {
          path: '/prj009/about',
          name: '关于',
          component: () => import('@/components/prj009/pages/About.vue'),
          iconCls: 'fa fa-tag fa-lg',
          leaf: false
        }
      ]
    }
    /* ***** */
  ]
})
