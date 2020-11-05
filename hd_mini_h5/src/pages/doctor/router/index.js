import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: "首页",
    component: Home
  },
  {
    path: "/doctoreditor",
    name: "DoctorEditor",
    meta: "医生编辑",
    component: () => import("../pages/DoctorEditor.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
