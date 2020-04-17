<template>
<transition name="fade" mode="out-in">
  <div class="page-container">
      <div class="content">
        <h1>Sign up</h1>
        <input v-model="email" type="text" placeholder="Email address" class="email-input auth-input"><br>
        <input v-model="password" type="password" placeholder="Password" class="password-input auth-input"><br>
        <button class="button auth-button" @click="registerButtonPressed">Signup</button>
      </div>
  </div>
</transition>
</template>

<script>
  //OST-28

  import firebase from "firebase";

  export default {
    data() {
      return {
        email: "",
        password: ""
      };
    },
    //----------iterate 'registerButtonPressed() over each user. Send in as parameter'
    methods: {
      async registerButtonPressed() {
        try {
          var {user} = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
          // signout
          firebase.auth().signOut().then(user => {
              this.$router.push("/login");
              //console.log("SUCCESS");
              console.log(user);
          });
        } catch (error) {
          console.error("COULDN'T REGISTER USER");
          console.log(user);
          console.log(error.message);
        }
        console.log("END OF REGISTRATION");
      },
      async autoLogin(e, p) {
        try {
          var {
            user
          } = await firebase.auth().signInWithEmailAndPassword(e, p);
        } catch (error) {
          console.log(user);
          console.log(error.message);
        }
        console.log("ROUTING TO PROFILE");
        this.$router.push("/dashboard");
      }
    }
  };
</script>

<style scoped lang="scss">
.page-container {
    background: #f7f7f7;
}
</style>