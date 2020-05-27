import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    meta: {
      title: '登陆页面',
    },
    component: () => import('../views/AdminLogin/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '客户管理首页',
    },
    component: Home,
    children: [
      {
        path: '/article',
        name: 'Article',
        meta: {
          title: '文章管理',
        },
        component: () => import('../views/AdminArticle/index.vue')
      },
      {
        path: '/article/:one',
        name: 'ArticleOne',
        meta: {
          title: '文章更新页面',
        },
        component: () => import('../views/AdminArticle/editeArticle.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '用户管理',
        },
        component: () => import('../views/AdminUser/index.vue')
      },
      {
        path: '/web',
        name: 'Web',
        meta: {
          title: '网站管理',
        },
        component: () => import('../views/AdminWeb/index.vue')
      },
    ],
    redirect: '/web'
  },

  {
    path: '**',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
