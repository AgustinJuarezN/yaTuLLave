import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { currency } from './utils/currency'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB9dLWHj6kvJPZDzJZOq1ve0g9_qeWwVUI'
  },
})


Vue.filter('currency', currency)
Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
