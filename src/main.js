import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import ZeitUI from "@zeit-ui/vue"
import vStyler from "vstyler"
import VueApexCharts from "vue-apexcharts"
import VueTimeago from "vue-timeago"
import "spa-generic-css"

import "@zeit-ui/vue/dist/zeit-ui.css" // require style
import "@styles/index.css"

Vue.use(VueApexCharts)
Vue.use(vStyler)
Vue.use(ZeitUI)
Vue.use(VueTimeago, { name: "Timeago" })

Vue.component("apexchart", VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
