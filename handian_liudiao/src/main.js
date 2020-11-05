import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'font-awesome/css/font-awesome.min.css'

import router from './routes'

Vue.use(ElementUI)

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('userinfo')
  }
  let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
  if (!userinfo && to.path !== '/login') {
    if (/\/mobile\/*/.test(to.path)) {
      next()
    } else if (/\/help/.test(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

var vm = new Vue({
  data: { test: 'test' },
  router,
  render: h => h(App)
}).$mount('#app')