import Vue from 'vue'
import Vuex from 'vuex'
import propertys from './modules/propertys'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    propertys
  }
})
