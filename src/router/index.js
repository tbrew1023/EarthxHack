import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase'

import Home from '@/views/Home'
import About from '@/views/About'
import AllModules from '@/views/AllModules'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Admin from '@/views/Admin'
import LessonBuilder from '@/views/LessonBuilder'
import UserDash from '@/views/UserDash'
import Module from '@/views/Module'
import LessonTest from '@/views/LessonTest'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        guest: true
      }
    },
    {
      path: '/counsel_command',
      name: 'lesson_test',
      component: LessonTest,
      meta: {
        guest: true
      }
    },
    {
      path: '/all_modules',
      name: 'AllModules',
      component: AllModules,
      meta: {
        auth: true
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
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        auth: true
      }
    },
    {
      path: '/lesson_builder',
      name: 'lesson_builder',
      component: LessonBuilder,
      meta: {
        auth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDash,
      meta: {
        auth: true
      }
    },
  ],
})

//----------routing guards----------

router.beforeEach((to, from, next) => {

  firebase.auth().onAuthStateChanged(userAuth => {

    if (userAuth) {
      firebase.auth().currentUser.getIdTokenResult().then(function ({claims}) {
        if (claims.standard && !claims.admin) {
          if ((to.path === '/admin') || (to.path === '/lesson_builder')) {
            return next({
              path: '/dashboard',
            })
          }
        } 
        else if (claims.admin) {
          if ((to.path === '/dashboard') || (to.path === '/all_modules')) {
            return next({
              path: '/admin',
            })
          }
        } 
        else if (claims.builder) {
          if ((to.path === '/admin') || (to.path === '/lesson_builder')) {
            return next({
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

  next()

})


export default router
