import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    modulePage: false,
    moduleClick: false,
    lessonPage: false,
    navTrigger: false,
    timeSpent: {
      total: 0,
      dashboard: 0,
      advisoryLessons: 0,
      msLessons: 0,
      operationsLessons: 0,
      advisoryQuizzes: 0,
      msQuizzes: 0,
      operationsQuizzes: 0
    }
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
    navTrigger: state => state.navTrigger = !state.navTrigger,
    tock: (state, context) => {
      if(context == 'dashboard') {
        state.timeSpent.dashboard++;
      }
      else if(context == 'advisoryLessons') {
        state.timeSpent.advisoryLessons++;
      }
      else if(context == 'advisoryLessons') {
        state.timeSpent.advisoryLessons++;
      }
      else if(context == 'msLessons') {
        state.timeSpent.msLessons++;
      }
      else if(context == 'operationsLessons') {
        state.timeSpent.operationsLessons++;
      }
      else if(context == 'advisoryQuizzes') {
        state.timeSpent.advisoryQuizzes++;
      }
      else if(context == 'msQuizzes') {
        state.timeSpent.msQuizzes++;
      }
      else /* operations quizzes */ {
        state.timeSpent.operationsQuizzes++;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
