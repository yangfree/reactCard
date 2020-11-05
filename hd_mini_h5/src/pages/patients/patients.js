import Vue from "vue";
import Patients from "./Patients.vue";
import router from "./router";
// import store from './store'

import {
  Icon,
  Tabs,
  Tab,
  List,
  Form,
  Field,
  Popup,
  Button,
  DatetimePicker,
  DropdownMenu,
  DropdownItem,
  Cell,
  Dialog,
  Image as VanImage,
  PullRefresh
} from "vant";

Vue.use(Icon);
Vue.use(Tabs);
Vue.use(Tab);
Vue.use(List);
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Button);
Vue.use(DatetimePicker);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Cell);
Vue.use(Dialog);
Vue.use(VanImage);
Vue.use(PullRefresh);

import "../../assets/css/reset.less";

Vue.config.productionTip = false;

new Vue({
  router,
  //   store,
  render: h => h(Patients)
}).$mount("#patients");
