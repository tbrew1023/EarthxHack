<template>
<transition name="fade" mode="out-in">
    <div class="lesson-container" :class="(dark ? 'dark' : '' )">
        <div class="sky" v-scroll="handleScroll" :class="(sticky ? 'sticky' : '')"></div>
        <div class="banner" :style="'background-position: 0px ' + bannerOffset + 'px'">
            <h1>{{ title }}</h1>
        </div>
        <div class="lesson-text-container" v-html="content"></div>
        <router-link :to="'/quiz/' + $route.params.current"><div class="quiz-button"><span>Continue to Quiz 🠚</span></div></router-link>
    </div>
</transition>
</template>

<script>
import firebase from 'firebase';
import store from '../store';

export default {
    name: 'lesson',
    data() {
        return {
            content: ``,
            title: '',
            sticky: false,
            bannerOffset: 0,
            triggered: false,
            claims: {},
            userRef: {
                progress_advisory: NaN,
                progress_managed_services: NaN,
                progress_operations: NaN,
                completed: []
            }
        }
    },
    created() {
        console.log('lesson component created');
        this.fetchText();
        this.fetchQuestions();
        store.commit('lessonPage');
        this.setup();
    },
    computed: {
        context() {
            return this.$route.params.current;
        },
        mockText() {
            return (
                `
                    <h1 style="color:blue">Mock text!</h1>
                `
            );
        },
        dark() {
            return store.state.dark;
        }
    },
    methods: {
        async setup() {
            console.log('setup jazz');
            this.claims = await this.$auth.getUser()
            console.log(this.claims);
            this.bindData();
        },
        async isAuthenticated() {
            this.authenticated = await this.$auth.isAuthenticated();
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
                    try {
                        self.userRef.completed = [...doc.data().completed];
                    }
                    catch {
                        console.log('no lessons completed yet');
                    }
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
        },
        fetchQuestions() {
            var self = this;
            firebase.firestore().collection('HBRC_quizzes').where('lessonID', '==', this.context).get().then((docs) => {
                docs.forEach((doc) => {
                    //console.log(doc.data().serviceLine);
                    self.title = doc.data().serviceLine;
                });
            });
        },
        //fetchQuestions used in Quiz component
        fetchText() {
            var self = this;
            firebase.firestore().collection("lessons").where("lessonID","==",this.context).get().then((docs) => {
                docs.forEach((doc) => {
                    self.content = doc.data().content;
                });
            });
        },
        handleScroll() {
            //console.log(scrollY);
            this.bannerOffset = scrollY;
            if(window.scrollY > 300) {
                //console.log('trigger sticky');
                this.sticky = true;
                //store.commit('navTrigger');
            }
            else {
                //store.commit('navTrigger');
                this.sticky = false;
            }

            if(window.scrollY >= 100) {
                this.triggered = true;
            }
            else {
                this.triggered = false;
            }
        },
        alreadyComplete() {
            if(this.userRef.completed.includes(this.context)) {
                console.log('LESSON ALREADY COMPLETED');
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/global-styles/variables';

.gone {
    opacity: 0;
    transform: scale(0.4);
}

.here {
    opacity: 1;
    transform: scale(1);
}

.sticky {
    opacity: 1 !important;
}

h1 {
    opacity: 0;
    margin-top: 80px;
    font-size: 52px;
    font-weight: normal;
    animation: flyin 1s ease forwards 1.5s;
    transition: 300ms;
}

body {
    overflow: auto;
}

.banner {
    opacity: 0;
    position: relative;
    background: $colorGray1;
    height: 460px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    //padding-left: $gap;
    color: white;
    background-image: url('../assets/lic.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: 0s;
    animation: grow-v 2s ease forwards 0.5s;
}

.lesson-container {
    font-family: Nunito, roboto, sans-serif;
    padding-bottom: 150px;
}

.dark {

    h1 {
        color: white;
    }

    .sky {
        background: $colorDarkMid;
        box-shadow: 0px 12px 42px 42px $colorDarkMid;
    }

    .quiz-button {
        filter: invert(1);
    }

    .banner {
    }
}

.sky {
    background: white;
    width: 100%;
    height: 100px;
    z-index: 1;
    position: fixed;
    top:0px;
    margin: 0px;
    padding: 0px;
    padding-bottom: 38px;
    opacity: 0;
    box-shadow: 0px 12px 42px 42px white;
    border-radius: 0px 0px ($rad *2) ($rad * 2);
}

.lesson-text-container {
    //background: red;
    opacity: 0;
    width: 50% !important;
    margin-left: auto;
    margin-right: auto;
    padding-top: 80px;
    padding-bottom: 80px;
    font-size: 16px;
    line-height: 2;
    animation: flyup 1s forwards ease 2s;
}

a {
    text-decoration: none !important;
}

.quiz-button {
    color: white;
    background:black;
    width: 260px;
    height: 60px;
    border: 2px solid black;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 90px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    opacity: 0;
    animation: flyin 1s forwards ease 1s;

    span {
        padding: 12px 18px 12px 18px;
        font-size: 18px;
        font-weight: bold;
        transition: 0ms;
    }

    &:hover {
        color: black;
        background: transparent;
    }
}
</style>