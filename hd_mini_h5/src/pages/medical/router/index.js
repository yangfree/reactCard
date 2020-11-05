import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: "医护首页",
    component: Home
  },
  {
    path: "/medicaleditor",
    name: "MedicalEditor",
    meta: "医护编辑页面",
    component: () => import("../pages/MedicalEditor.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
