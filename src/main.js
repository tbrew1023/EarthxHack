import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import VueFullPage from 'vue-fullpage.js'

var firebaseConfig = {
  apiKey: "AIzaSyB2GWHnQGJupYnrxvOgJbY7rNOIjIgbF-E",
  authDomain: "vue-auth-hbr-2020.firebaseapp.com",
  databaseURL: "https://vue-auth-hbr-2020.firebaseio.com",
  projectId: "vue-auth-hbr-2020",
  storageBucket: "vue-auth-hbr-2020.appspot.com",
  messagingSenderId: "1025659923891",
  appId: "1:1025659923891:web:43d9a85adfec76d91aafc6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(VueFullPage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
