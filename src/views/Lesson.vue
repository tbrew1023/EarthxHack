<template>
<transition name="fade" mode="out-in">
    <div class="lesson-container" :class="(dark ? 'dark' : '' )">
        <div class="sky"></div>
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
            content: ``
        }
    },
    created() {
        console.log('lesson component created');
        this.fetchText();
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
        fetchQuestions() {
            firebase.firestore().collection('HBRC_quizzes').where('lessonID', '==', this.context).get().then((docs) => {
                docs.forEach((doc) => {
                    console.log(doc.data());
                });
            });
        },
        //fetchQuestions used in Quiz component
        fetchText() {
            var self = this;
            firebase.firestore().collection("lessons").where("lessonID","==",this.context).get().then((docs) => {
                docs.forEach((doc) => {
                    self.content = doc.data().content
                });
            });
        }
    }
}
</script>

<style lang="scss">
@import '../assets/global-styles/variables';

body {
    overflow: auto;
}

.lesson-container {
    font-family: Nunito, roboto, sans-serif;
    padding-bottom: 150px;
}

.dark {
    .sky {
        background: $colorDarkMid;
        box-shadow: 0px 12px 42px 42px $colorDarkMid;
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
    box-shadow: 0px 12px 42px 42px white;
}

.lesson-text-container {
    //background: red;
    width: 50% !important;
    margin-left: auto;
    margin-right: auto;
    padding-top: 300px;
    padding-bottom: 80px;
    font-size: 16px;
    line-height: 2;
    animation: flyup 1s forwards ease;
}

a {
    text-decoration: none !important;
}

.quiz-button {
    color: white;
    background:$colorGreen;
    width: 200px;
    height: 60px;
    border: 2px solid $colorGreen;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $rad;
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
        color: $colorGreen;
        background: transparent;
    }
}
</style>