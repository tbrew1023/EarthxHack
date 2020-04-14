<template>
  <div class="page-container">
    <div class="content">
        <h1>Servicer page</h1>
        <p>{{ msg }}</p>
        <button class="button sign-out" @click="signout">Sign out</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
    data() {
        return {
            user: null
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
    },
    methods: {
        signout() {
            firebase.auth().signOut().then(user => {
                // this.$store.commit("setUser", null);
                this.$router.push("/");
                console.log(user);
                document.location.reload();
            });
        }
    }
};
</script>

<style scoped lang="scss">
.page-container {
    //background: pink;
}
</style>