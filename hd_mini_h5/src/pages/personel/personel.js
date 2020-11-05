import Vue from "vue";
import Personel from "./Personel.vue";
import router from "./router";
import store from "./store";

import {
  Form,
  Field,
  Button,
  Loading,
  Tag,
  Cell,
  CellGroup,
  Icon,
  NoticeBar,
  Dialog,
  RadioGroup,
  Radio,
  Toast,
  Notify,
  Image as VanImage,
  Skeleton,
  Col,
  Row,
  AddressList,
  AddressEdit
} from "vant";

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(NoticeBar);
Vue.use(Dialog);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Notify);
Vue.use(VanImage);
Vue.use(Toast);
Vue.use(Skeleton);
Vue.use(Col);
Vue.use(Row);
Vue.use(AddressList);
Vue.use(AddressEdit);

import "../../assets/css/reset.less";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Personel)
}).$mount("#personel");
