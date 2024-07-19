import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueGeolocation from "vue-browser-geolocation";
import 'leaflet/dist/leaflet.css';
// import "leaflet-geosearch/dist/geosearch.css";



Vue.config.productionTip = false;

Vue.use(VueGeolocation);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCV38DNBC5BvFmaTlcxtaaG-E26jGAB3bw",
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
