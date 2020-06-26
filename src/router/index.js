//import firebase from 'firebase'

import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

//import Home from '@/views/Home'
import About from '@/views/About'
import AllModules from '@/views/AllModules'
//import Login from '@/views/Login'
import Register from '@/views/Register'
import Admin from '@/views/Admin'
import LessonBuilder from '@/views/LessonBuilder'
import UserDash from '@/views/UserDash'
import Module from '@/views/Module'
import LessonTest from '@/views/LessonTest'
import Resources from '@/views/Resources'
import VendorData from '@/views/VendorData'
import SkillsData from '@/views/SkillsData'
import Quiz from '@/views/Quiz'
import Lesson from '@/views/Lesson'
import Score from '@/views/Score'

const CALLBACK_PATH = '/implicit/callback'

const config = {
  clientId: '0oaegy7l0AL6YJ4VF4x6',
  issuer: 'https://dev-347385.okta.com/oauth2/default',
  redirectUri: 'http://localhost:5000/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}

Vue.use(Router)
Vue.use(Auth, {...config})

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserDash,
      meta: {
        //guest: true
        requiresAuth: true
      }
    },

    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        //guest: true
        requiresAuth: false
      }
    },

    {
      path: '/resources',
      name: 'resources',
      component: Resources,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

    {
      path: '/vendor_data',
      name: 'vendor_data',
      component: VendorData,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/skills_data',
      name: 'skills_data',
      component: SkillsData,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/counsel_command',
      name: 'lesson_test',
      component: LessonTest,
      meta: {
        //guest: true
        requiresAuth: true
      }
    },

    {
      path: '/all_modules',
      name: 'AllModules',
      component: AllModules,
      meta: {
        //auth: true
        requiresAuth: true
      },
      children: [
        {
          path: ':current',
          name: 'module',
          component: Module
        }
      ]
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        //guest: true
        requiresAuth: false
      }
    },

    {
      path: CALLBACK_PATH,
      name: 'login',
      component: Auth.handleCallback(),
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

    {
      path: '/lesson_builder',
      name: 'lesson_builder',
      component: LessonBuilder,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDash,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

    {
      path: '/lesson/:current',
      name: 'lesson',
      component: Lesson,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

    {
      path: '/quiz/:current',
      name: 'quiz',
      component: Quiz,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

    {
      path: '/score/:current',
      name: 'score',
      component: Score,
      meta: {
        //auth: true
        requiresAuth: true
      }
    },

  ],
})

//----------routing guards----------

/*router.beforeEach((to, from, next) => {

  firebase.auth().onAuthStateChanged(userAuth => {

    if (userAuth) {
      firebase.auth().currentUser.getIdTokenResult().then(function ({claims}) {
        if (claims.standard && !claims.admin) {
          if ((to.path === '/admin') || (to.path === '/lesson_builder')) {
            return next({
              //if signed in but not admin, don't allow navigation to admin dashboard
              path: '/dashboard',
            })
          }
        } 
        else if (claims.admin) {
          if ((to.path === '/dashboard') || (to.path === '/all_modules')) {
            return next({
              //if admin, don't allow navigation to user dashboard
              path: '/admin',
            })
          }
        }
        else if (claims.builder) {
          if ((to.path === '/admin') || (to.path === '/lesson_builder')) {
            return next({
              //if lesson bulider but not admin, do not allow navigation to admin dashboard
              path: '/lesson_builder',
            })
          }
        }
      })
    } 
    else {
      if (to.matched.some(record => record.meta.auth)) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    }

  })

  console.log('guard route');
  console.log(to, from);

  next()

})*/

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
