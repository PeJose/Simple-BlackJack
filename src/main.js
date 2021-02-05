import Vue from "vue";
import App from "@/components/App.vue";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import store from "@/store/index.js";
import Axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
