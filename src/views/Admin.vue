<template>
  <div class="page-container">
      <div class="content">
        <h1 v-if="user">{{ user.email }}</h1>
        <button class="button sign-out" @click="signout">Sign out</button>
            <table class="table user-table">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td data-label="Name">{{user.email}}</td>
                    <select @change="changeRole(user.id, $event)">
                        <option :selected="user.role.driver" value="lesson_builder">Lesson Bulider</option>
                        <option :selected="user.role.customer" value="customer">Customer</option>
                    </select>
                </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            users: [],
            user: null
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
        this.users = [];
        firebase.firestore().collection("roles").get().then(snap => {
            snap.forEach(doc => {
                var user = doc.data();
                user.id = doc.id;
                //console.log(doc.data());
                if (!user.role.admin) this.users.push(user);
            });
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
        },
        changeRole(uid, event) {
            var addMessage = firebase.functions().httpsCallable("setUserRole");
            var data = { uid: uid, role: { [event.target.value]: true } };
            addMessage(data).then(function(result) {
                    console.log(result);
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    }
};
</script>

<style scoped lang="scss">
.page-container {
    //background: gray;
}
</style>