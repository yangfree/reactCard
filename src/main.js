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

// 引入markdown-editor
// import mavonEditor from 'mavon-editor';
// import 'mavon-editor/dist/css/index.css';
// Vue.use(mavonEditor);


// 引入store
import store from '@/store';

// 路由跳转全局拦截
router.beforeEach((to, from, next) => {
  // console.log('执行了...');
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  store.state.token = sessionStorage.getItem('token');
  if (to.meta.requireAuth) {
    // console.log('1111111111',store.state.token)
    if (store.state.token !== null) {
      next();
    } else {
      // console.log('-login-');
      next({
        path: '/login',
      });
    }
  }
  next();
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
