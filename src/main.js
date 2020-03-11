import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import ElementUI from "element-ui";
import Vuepartcles from "vue-particles";
import u from './util/util.js';
import "element-ui/lib/theme-chalk/index.css";
import "./css/reset.elementui.css";
import "./css/common.scss";

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = u.http;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuepartcles);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
