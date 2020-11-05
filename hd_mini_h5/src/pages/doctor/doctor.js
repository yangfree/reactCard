import Vue from "vue";
import Doctor from "./Doctor.vue";
import router from "./router";
// import store from './store'

import {
  Icon,
  Col,
  Row,
  NoticeBar,
  Cell,
  CellGroup,
  Button,
  List,
  Dialog,
  Tab,
  Tabs,
  Image as VanImage,
  Popup,
  DatetimePicker,
  DropdownItem,
  DropdownMenu,
  Form,
  Field,
  Uploader
} from "vant";

Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(NoticeBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(List);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(VanImage);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);

import "@/assets/css/reset.less";

Vue.config.productionTip = false;

new Vue({
  router,
  //   store,
  render: h => h(Doctor)
}).$mount("#doctor");
