import Vue from 'vue';
// 引入element-ui
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入根组件和路由
import App from './App.vue';
import router from './router';

Vue.use(ElementUi);

import './api/axios';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
