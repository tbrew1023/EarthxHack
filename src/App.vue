<template>
  <div id="app">
    <div id="nav">
      <div class="logo-container">
        <div class="logo"></div>
      </div>
      <ul class="nav-inner">
        <router-link to="/"><li>Home</li></router-link>
        <router-link to="/about"><li>About</li></router-link>
        <router-link v-if="user" to="/feed"><li>Feed</li></router-link>
        <router-link v-if="!user" to="/register"><li>Sign up</li></router-link>
        <router-link v-if="!user" to="/login"><li>Login</li></router-link>
        <router-link v-if="admin" to="/admin"><li>Admin</li></router-link>
        <router-link v-if="driver || admin" to="/driver"><li>Servicer</li></router-link>
        <router-link v-if="customer || admin" to="/customer"><li><div class="profile-image-container"><div class="profile-image"></div></div></li></router-link>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            user: null,
            customer: null,
            driver: null,
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
          self.customer = claims.customer;
          self.driver = claims.driver;
          self.admin = claims.admin;
        });
      });
  },
    
};
</script>

<style lang="scss">
$navHeight: 80px;

body {
  margin: 0px;
}

input {
  margin-bottom: 12px;
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
  background:white;
  position: fixed;
  width: 100%;
  height: $navHeight;

  .divider {
    opacity: 0.6;
    cursor: default;

    &:hover {
      background: transparent;
    }
  }
  li {
    //transition: 200ms;

    &:hover {
      background: rgba(black, 0.05);
    }
  }

  .nav-inner {
    list-style: none;
    display: inline-flex;
    padding: 0px;
    position: absolute;
    height: 80px;
    width: max-content;
    right: 0px;
    margin: 0px;
    line-height: $navHeight;
    margin-right: 24px;

    li {
      margin: 0px;
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  a {
    font-weight:200;
    color: #2c3e50;
    //margin-left: 12px;
    //margin-right: 12px;
    text-decoration: none;

    &.router-link-exact-active {
      color: lightseagreen;
      text-decoration: underline;
    }
  }
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

.logo-container {
  //background: red;
  height: $navHeight;
  width: 90px;
  position: absolute;
  //left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    //background: yellow;
    height: 45px;
    width: 45px;
    background-image: url("assets/oolong.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.3;
  }
}

button {
    border: none;
    border-radius: 12px;
    background: hotpink;
    color: white;
    padding: 12px;
    cursor: pointer;

    &:hover {
        filter: brightness(0.6);
    }
}
</style>
