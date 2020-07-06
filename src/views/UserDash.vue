<template>
    <transition name="fade" mode="out-in">
    <div class="page-container">
        <div class="content">
            <!--h1 v-if="user">{{ user.email }}</h1>
            <button class="button sign-out" @click="signout">Sign out</button-->

            <div class="parent">
                <div class="dash-item div1 dash-item-recents">
                    <Recent :user="userRef" :claims="claims" title="Leaderboard" />
                </div>
                <div class="dash-item div2 dash-item-badges">
                    <Badges :user="userRef" :claims="claims" title="Badges" />
                </div>
                <div class="dash-item div3 dash-item-upnext">
                    <UpNext :user="userRef" :claims="claims" title="Up Next" />
                </div>
                <div class="dash-item div4 dash-item-profile">
                    <Profile :user="userRef" :claims="claims" title="Profile" :signout="signout" />
                </div>
                <div class="dash-item div6 dash-item-total">
                    <Total :user="userRef" :claims="claims" title="Total Progress" />
                </div>
                <div class="dash-item div5 dash-item-welcome">
                    <Welcome :user="userRef" :claims="claims" />
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
import store from '../store';

const POST_LOGOUT_REDIRECT_URI = '/';
const ISSUER = 'https://dev-347385.okta.com/oauth2/default';

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
                progress_advisory: 0,
                progress_managed_services: 0,
                progress_operations: 0,
            },
            claims: {},
            clock: null
        };
    },
    created() {
        var self = this;
        self.setup();
        console.clear();
        console.log('BEGIN CLOCK FOR DASHBOARD');
        self.startClock();

        var jirate = false;
        this.clock = setInterval(() => {
            jirate = !jirate;
            //console.log(( jirate ? 'tick' : 'tock' ));
            self.tick();
        }, 1000);
        
    },
    destroyed() {
        var self = this;
        self.stopClock();

        console.log('PULLING NEW TIME OBJ FROM STATE AND PUSHING TO BACKEND.....');

        var fireRef = firebase.firestore().collection('users');
        fireRef.doc(self.claims.sub);
    },
    methods: {
        startClock() {
            this.clockActive = true;
        },
        stopClock() {
            this.clockActive = false;
            clearInterval(this.clock);
        },
        tick() {
            store.commit('tock', 'dashboard');
        },
        async setup() {
            console.log('setup jazz');
            this.claims = await this.$auth.getUser()
            console.log(this.claims);
            this.bindData();
        },
        async isAuthenticated() {
            this.authenticated = await this.$auth.isAuthenticated();
        },
        async logout() {
            // read idToken before local session is cleared
            const idToken = await this.$auth.getIdToken();
            // clear local session
            await this.$auth.logout();
            // clear remote session
            window.location.href = `${ISSUER}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`
        },
        signout() {
            /*firebase.auth().signOut().then(user => {
                // this.$store.commit("setUser", null);
                this.$router.push("/login");
                console.log(user);
                document.location.reload();
            });*/

            
        },
        fetchData() {
          /*var self = this;

          var fireRef = firebase.firestore().collection("users");

          fireRef.doc(self.claims.sub).get().then((doc) => {
              self.userRef = doc.data();
              console.log('userRef: ', self.userRef);
          });*/
        },
        bindData() {
            console.log('binding data..........');
            var self = this;
            var fireRef = firebase.firestore().collection('users');
            fireRef.doc(self.claims.sub).get().then((doc) => {
                console.log('exists?: ', doc.exists);
                if(doc.exists) { //pull ref data
                    console.log('doc exists');
                    console.log(doc.data());
                    self.userRef.progress_advisory = doc.data().progress_advisory;
                    self.userRef.progress_managed_services = doc.data().progress_managed_services;
                    self.userRef.progress_operations = doc.data().progress_operations;
                }
                else { //create ref data
                    console.log("doc doesn't exist... creating doc");
                    fireRef.doc(self.claims.sub).set({
                        progress_advisory: 0,
                        progress_managed_services: 0,
                        progress_operations: 0
                    });
                }
            });

            //console.log('data successfully binded.');
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