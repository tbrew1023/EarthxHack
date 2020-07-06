import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import VueFullPage from 'vue-fullpage.js'

var firebaseConfig = {
  apiKey: "AIzaSyCDthcCrOYOi2t9G7n8Waugsq8EW70oE6c",
  authDomain: "hbrc-18a6e.firebaseapp.com",
  databaseURL: "https://hbrc-18a6e.firebaseio.com",
  projectId: "hbrc-18a6e",
  storageBucket: "hbrc-18a6e.appspot.com",
  messagingSenderId: "757016957385",
  appId: "1:757016957385:web:73367ef6cb18b892995818"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(VueFullPage);

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
