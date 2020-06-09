<template>
<transition name="fade" mode="out-in">
  <div class="page-container">
      <div class="content">
        <h1>Login</h1>
        <input v-model="email" name="email" type="text" placeholder="Email address" class="email-input auth-input"><br>
        <input v-model="password" name="password" type="password" placeholder="Password" class="password-input auth-input"><br>
        <button v-if="!this.$parent.authenticated" class="button auth-button" @click="loginButtonPressed">Login</button>
      </div>
  </div>
</transition>
</template>

<script>
  //import firebase from "firebase";

  export default {
    data() {
      return {
        email: "",
        password: ""
      };
    },
    created() {
      /*firebase.auth().onAuthStateChanged(userAuth => {
          if (userAuth) {
            //document.location.reload();
          }
      });*/

      console.log('passed auth state value: ', this.$parent.authenticated);
    },
    mounted() {
      
    },
    methods: {
      async loginButtonPressed() {
          console.log("ROUTING TO PROFILE");
          this.$auth.loginRedirect('/dashboard');
      }
    }
  };
</script>

<style scoped lang="scss">
.page-container {
    background: #f7f7f7;
}

h1 {
  text-align: center;
}

button {
  padding: 8px;
  width: 100%;
}
</style>

<!--



-->