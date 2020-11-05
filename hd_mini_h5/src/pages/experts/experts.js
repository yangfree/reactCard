import Vue from "vue";
import Experts from "./Experts.vue";
// import Home from './pages/Home';
import router from "./router";
// import store from './store'

import {
  Search,
  List,
  Cell,
  PullRefresh,
  Row,
  Col,
  Image as VanImage,
  Lazyload,
  Tag,
  Button,
  Popup,
  RadioGroup,
  Radio,
  Skeleton,
  Form,
  Field,
  DropdownMenu,
  DropdownItem,
  DatetimePicker,
  Dialog,
  Tab,
  Tabs,
  Uploader,
  ImagePreview,
  Icon
} from "vant";

Vue.use(Search);
Vue.use(List);
Vue.use(Cell);
Vue.use(PullRefresh);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Tag);
Vue.use(Button);
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Skeleton);
Vue.use(Form);
Vue.use(Field);
Vue.use(DatetimePicker);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Uploader);
Vue.use(ImagePreview);
Vue.use(Icon);

import "@/assets/css/reset.less";
Vue.config.productionTip = false;

new Vue({
  router,
  //   store,
  render: h => h(Experts)
}).$mount("#experts");
