<template>
    <transition name="fade" mode="out-in">
    <div class="page-container">
        <div class="content">
            <!--h1 v-if="user">{{ user.email }}</h1>
            <button class="button sign-out" @click="signout">Sign out</button-->

            <div class="parent">
                <div class="dash-item div1 dash-item-recents">
                    <Recent :user="userRef" title="Leaderboard" />
                </div>
                <div class="dash-item div2 dash-item-badges">
                    <Badges :user="userRef" title="Badges" />
                </div>
                <div class="dash-item div3 dash-item-upnext">
                    <UpNext :user="userRef" title="Up Next" />
                </div>
                <div class="dash-item div4 dash-item-profile">
                    <Profile :user="userRef" title="Profile" :signout="signout" />
                </div>
                <div class="dash-item div6 dash-item-total">
                    <Total :user="userRef" title="Total Progress" />
                </div>
                <div class="dash-item div5 dash-item-welcome">
                    <Welcome :user="userRef" />
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import firebase from "firebase";
import Welcome from "@/components/user_dash/Welcome";
import Profile from "@/components/user_dash/Profile";
import Total from "@/components/user_dash/Total";
import Recent from "@/components/user_dash/Recent";
import Badges from "@/components/user_dash/Badges";
import UpNext from "@/components/user_dash/UpNext";

export default {
    name: 'UserDash',
    components: {
        Welcome,
        Profile,
        Total,
        Recent,
        Badges,
        UpNext
    },
    data() {
        return {
            user: null,
            userRef: {
                firstName: "",
                lastName: "",
                fullName: "",
                email: "",
                totalProgress: 0,
                progressAdvisory: 0,
                progressManagedServices: 0,
                progressOperations: 0,
                companyRole: ""
            }
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
            console.log(self.user.uid);
            self.fetchUser();
        })
    },
    methods: {
        signout() {
            firebase.auth().signOut().then(user => {
                // this.$store.commit("setUser", null);
                this.$router.push("/login");
                console.log(user);
                document.location.reload();
            });
        },
        fetchUser() {
          var self = this;
          firebase
          .firestore()
          .collection("roles")
          .doc(self.user.uid)
          .get().then((doc) => {
              self.userRef = doc.data();
              self.userRef.fullName = self.userRef.firstName + " " + self.userRef.lastName;
              self.totalProgress = parseInt((self.progressAdvisory + self.progressManagedServices + self.progressOperations) / 3);
          });
      }
    }
};
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

.page-container {
    background: $colorBackdrop;
    overflow: hidden;
}
.content {
    margin-top: $navHeight;
    width: 100%;
    padding-left: $gap;
    padding-right: $gap;
    height: calc(100vh - #{$navHeight} - #{$gap} * 2); //interpolate variables
}
.parent {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: $gap;
    width: 100%;
    height: 100%;
}
.dash-item {
    background: #ffffff;
    border-radius: $rad;
    opacity: 0;
}
.div1 { //recent modules
    grid-area: 1 / 5 / 3 / 7; 
    animation: flyin 1s ease forwards;
    animation-delay: 0.8s;
    //box-shadow: $softerShadow;
    overflow: auto;
}
.div2 { //badges
    grid-area: 3 / 5 / 4 / 7; 
    animation: flyin $pageTransitionSpeed ease forwards;
    animation-delay: 1s;
    background: transparent !important;
}
.div3 { //up next
    grid-area: 4 / 1 / 5 / 7;
    background: rgba(0,0,0,0);
    animation: flyin $pageTransitionSpeed ease forwards;
    animation-delay: 0.4s;
}
.div4 { //profile
    grid-area: 2 / 1 / 4 / 3; 
    animation: flyin $pageTransitionSpeed ease forwards;
    animation-delay: 0.2s;
    //box-shadow: $softerShadow;
}
.div6 { //total progress
    grid-area: 1 / 3 / 4 / 5; 
    animation: flyin $pageTransitionSpeed ease forwards;
    animation-delay: 0.6s;
    //box-shadow: $softerShadow;
}
.div5 { //welcome banner
    grid-area: 1 / 1 / 2 / 3; 
    background: rgba($colorBlue, 0.06);
    animation: flyin $pageTransitionSpeed ease forwards;
    //box-shadow: $softerShadow;
}
</style>