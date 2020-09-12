import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/tailwind.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import VTooltip from "v-tooltip";
import titleMixin from "./mixins/titlemixin.js";

Vue.mixin(titleMixin);

Vue.use(VTooltip);
Vue.use(VueToast, {
  position: "bottom-left",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
