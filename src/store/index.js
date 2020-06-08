import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    modulePage: false,
    moduleClick: false,
    lessonPage: false,
    navTrigger: false
  },
  mutations: {
    toggleDark: state => state.dark = !state.dark,
    modulePage: state => {
      state.modulePage = true; 
      state.moduleClick = false; 
      console.log('module clicked?: ' + state.moduleClick);
      console.log('nav clicked?: ' + state.modulePage);
    },
    lessonPage: state => {
      state.lessonPage = true;
    },
    moduleClick: state => {
      state.moduleClick = true; 
      state.modulePage = false;
    },
    navTrigger: state => state.navTrigger = !state.navTrigger
  },
  actions: {
  },
  modules: {
  }
})
