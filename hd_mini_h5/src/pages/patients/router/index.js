import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: "患者首页",
    component: Home
  },
  {
    path: "/patientorder",
    name: "PatientOrder",
    meta: "患者订单",
    component: () => import("../pages/PatientOrder.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
