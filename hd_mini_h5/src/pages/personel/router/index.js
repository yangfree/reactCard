import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Personel",
    meta: "个人中心",
    component: Home
  },
  {
    path: "/personelinfo",
    name: "PersonelInfo",
    meta: "完善个人信息",
    component: () => import("../pages/PersonelInfo.vue")
  },
  {
    path: "/custormer",
    name: "Customer",
    meta: "客服中心",
    component: () => import("../pages/Customer.vue")
  },
  {
    path: "/useinfomation",
    name: "UseInfomation",
    meta: "使用须知",
    component: () => import("../pages/UseInfomation.vue")
  },
  {
    path: "/address",
    name: "Address",
    meta: "地址管理",
    component: () => import("../pages/Address.vue")
  },
  {
    path: "/editaddress",
    name: "EditAddress",
    meta: "地址管理",
    component: () => import("../pages/AddressEdit.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
