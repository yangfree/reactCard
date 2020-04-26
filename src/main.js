import Vue from 'vue';
// 引入element-ui
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// css
import 'normalize.css';

// 引入根组件和路由
import App from './App.vue';
import router from './router';

Vue.use(ElementUi);

import './api/api';

// 路由跳转全局拦截
router.beforeEach((to, from, next) => {
  // console.log(to.meta.title);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
