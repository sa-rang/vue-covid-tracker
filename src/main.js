import Vue from "vue";
import App from "./App.vue";
//import router from './router'
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";

Vue.config.productionTip = false;

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

Vue.use(Vuex);

new Vue({
  //router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
