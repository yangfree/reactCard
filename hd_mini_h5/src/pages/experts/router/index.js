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
    path: "/consultation",
    name: "Consultation",
    meta: "信息编辑",
    component: () => import("../pages/Consultation.vue")
  },
  {
    path: "/todolist",
    name: "TodoList",
    meta: "代办列表",
    component: () => import("../pages/TodoList.vue")
  },
  {
    path: "/experteditor",
    name: "ExpertEditor",
    meta: "信息编辑",
    component: () => import("../pages/ExpertEditor.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
