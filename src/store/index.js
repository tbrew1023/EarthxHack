import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    modulePage: false,
    moduleClick: false
  },
  mutations: {
    toggleDark: state => state.dark = !state.dark,
    modulePage: state => {state.modulePage = true; state.moduleClick = false; console.log('clicked all modules <3')},
    //moduleClick: state => {state.moduleClick = true; state.modulePage = false; console.log('clicked module')}
  },
  actions: {
  },
  modules: {
  }
})
