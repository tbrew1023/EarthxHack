<template>
  <div :class="(dark ? 'dark-mode' : '')" id="app">
    <div id="nav">
      <div class="logo-container">
        <div class="logo"></div>
      </div>
      <ul class="nav-inner">
        <router-link class="nav-item" v-if="!user && !admin" to="/register"><li><span>Sign up</span></li></router-link>
        <router-link class="nav-item" v-if="!user && !admin" to="/login"><li><span>Login</span></li></router-link>
        <router-link class="nav-item" v-if="user && !admin" to="/dashboard"><li><div class="icon dash-icon"></div><span>Dashboard</span></li></router-link>
        <router-link v-on:click.native="modulePage()" class="nav-item" v-if="user && !admin" to="/all_modules"><li><div class="icon modules-icon"></div><span>All Modules</span></li></router-link>
        <router-link class="nav-item" v-if="admin" to="/admin"><li><div class="icon admin-icon"></div><span>Admin</span></li></router-link>
        <router-link class="nav-item" v-if="user || admin" to="/about"><li><div class="icon res-icon"></div><span>Quiz Intro</span></li></router-link>
      </ul>
      <div class="toggle-container">
        <div v-on:click="toggleDark" class="toggle"><div :class="(dark ? 'dark-button' : 'light-button')"></div></div>
      </div>
    </div>
      
    <router-view />

  </div>
</template>

<script>
import firebase from "firebase";
import store from './store'

export default {
    data() {
        return {
            user: null,
            builder: null,
            admin: null
        };
    },
    created() {
      var self = this;
      firebase.auth().onAuthStateChanged(userAuth => {
        self.user = userAuth;
        console.log(self.user.uid);

        firebase.auth().currentUser.getIdTokenResult().then(({claims}) => {
          console.log(claims);
          self.user = claims.standard;
          self.builder = claims.builder;
          self.admin = claims.admin;
        });
      });
    },
    computed: {
      dark() {
        return store.state.dark;
      },
      backColor() {
        return (store.state.dark ? '#212225' : '#f7f7f7');
      },
      navGone() {
        return (!store.state.moduleClick);
      }
    },
    methods: {
      toggleDark() {
        store.commit('toggleDark');
      },
      modulePage() {
        store.commit('modulePage');
        console.log('context: ' + store.state.modulePage);
      }
    }
    
};
</script>

<style lang="scss"> 
@import 'assets/global-styles/variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Work+Sans&display=swap');

  *{
    transition: 300ms;
  }

body {
  margin:0px;
  overflow: hidden;
  background: var(--back-color);
}

.dark-mode {
  background: $colorDarkMid !important;
  p, h1, h2, h3, h4, span {
    color: white !important;
  }
  .auth-input {
    background: $colorDarkLight;
    color: white;
  }
  .auth-button {
    border: 2px white solid;
    color: white;

    &:hover {
      background: white;
      color: black;
    }
  }
  .greetings {
    color: $colorOrange !important;
  }
  .page-container {
    background: $colorDarkMid !important;
  }
  .dash-item-profile, .dash-item-recents, .dash-item-total, .dash-item-badges {
    background: $colorDarkLight !important;
  }
  .sign-out {
    background: transparent;
    border: solid 2px white !important;
    color: white !important;
    transition: 300ms;
    &:hover {
      background: white !important;
      color: black !important;
    }
  }
  .icon {
    filter: brightness(0) invert(1) !important;
  }
  .logo {
    filter: brightness(0) invert(1) !important;
  }
  .chart-button {
    filter: invert(1) !important;
  }
  .chart-button-inactive {
    opacity: 0.2 !important;
  }
  #nav a {
    opacity: 0.2 !important;

    &.router-link-exact-active {
      opacity: 1 !important;
    }
  }
  .circle-progress::after, .circle-progress-snap::after {
    //background: red !important;
    color: white;
  }

}

#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input {
  margin-bottom: 12px;
}

h4 {
    text-align: left;
    margin-top: 0px;
}

.page-container {
  margin: 0px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:-1;
}

.profile-image-container {
  //background: gray;
  //border-radius: 100%;
  width: 40px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  .profile-image {
    width: 40px;
    height: 40px;
    //background: blue;
    border-radius: 100%;
    background-image: url('assets/account-icon.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  //padding: 24px;
  z-index: 12;
  background:transparent;
  position: fixed;
  width: 100%;
  height: $navHeight;
  display:flex;
  justify-content: center;

  .divider {
    opacity: 0.6;
    cursor: default;

    &:hover {
      background: transparent;
    }
  }

  li {
    //transition: 200ms;
    display: flex;
    align-items: center;
    font-weight: bold;

    .icon {
      //background: black;
      width: 24px;
      height: 24px;
      margin-right: 12px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      filter: brightness(0);
      transition: $animationSpeed;
    }
  }

  .dash-icon {
    background-image: url("assets/icons/dashboard.svg");
  }

  .modules-icon {
    background-image: url("assets/icons/modules.svg");
    transform: rotate(90deg);
  }

  .res-icon {
    background-image: url("assets/icons/resources.svg");
  }

  .admin-icon {
    background-image: url("assets/icons/admin.svg");
  }

  .nav-inner {
    list-style: none;
    display: inline-flex;
    padding: 0px;
    //position: absolute;
    height: $navHeight;
    width: max-content;
    //right: 0px;
    margin: 0px;
    line-height: calc(#{$navHeight} + #{$gap});
    //margin-right: 24px;

    li {
      margin: 0px;
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  a {
    font-weight:200;
    color: #2c3e50;
    //margin-left: 12px;
    //margin-right: 12px;
    text-decoration: none;
    opacity: 0.4;
    transition: $animationSpeed;

    &:hover {
      opacity: 0.7;
    }

    &.router-link-exact-active {
      color: black;
      font-weight: bold;
      opacity: 1;
      //text-decoration: underline;

      .icon {
        //filter: brightness(1);
      }
    }
  }
}

.toggle-container {
  //background: red;
  height: calc(#{$navHeight} + #{$gap});
  width: 64px;
  position: absolute;
  right: $gap;
  display: flex;
  justify-content: center;
  align-items: center;

  .toggle {
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }
}

.logo-container {
  //background: red;
  height: calc(#{$navHeight} + #{$gap});
  width: 128px;
  position: absolute;
  left: $gap;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    //background: yellow;
    height: $navHeight;
    width: 100%;
    background-image: url("assets/HBR-Logo.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    filter: contrast(0) brightness(0);
  }
}

.auth-button {
  background: transparent;
  border: solid 2px black;
  color: black;
  transition: 300ms;
  margin-top: 12px;
  border-radius: $rad;

  &:hover {
    background: black;
    color: white;
  }
}

.auth-input, .textbox {
  background: white;
  border:none;
  padding: 12px 24px;
  border-radius: $rad;
}

button {
    border: none;
    border-radius: $rad;
    background: hotpink;
    color: white;
    padding: 12px;
    cursor: pointer;
    font-weight: bold;
}

//transition animation fade

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-active, .fade-leave-active {
  transition: all 300ms ease;
}

//transition animation shift

.shift-enter, .shift-leave-to {
  opacity: 0;
  //transform: scale(0.5);
  //background: red !important;
    //transform: translateY(124px);
}

.shift-enter-active, .shift-leave-active {
  transition: all 300ms ease;
}

//transition animation leave

.gone-enter, .gone-leave-to {
    opacity: 0;
  //transform: scale(0.5);
  //background: red !important;
    transform: translateY(124px);

}

.gone-enter-active, .gone-leave-active {
  transition: all 300ms ease;
}

.dark-button {
  //background: red;
  width: 24px;
  height: 24px;
  background-image: url('assets/icons/sun.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  filter: invert(1);
  opacity: 0.4;
  transition: 300ms;

  &:hover {
    opacity: 1;
  }
}

.light-button {
  //background: red;
  width: 24px;
  height: 24px;
  background-image: url('assets/icons/moon.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  transition: 300ms;
  //filter: invert(1);

  &:hover {
    opacity: 1;
  }
}
</style>
