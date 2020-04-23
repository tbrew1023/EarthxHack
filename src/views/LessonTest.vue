<template>
<transition name="fade" mode="out-in">
  <div class="page-container">
      <div class="backdrop">
          <div @click="handleBack" class="bottom-button"><div class="inner-button back-button">Back</div></div>
          <h2 class="vid-title">CounselCommand | HBR Consulting</h2>
          <div class="bottom-button"><router-link to="/about"><div class="inner-button quiz-button">Take Quiz<span>🡒</span></div></router-link></div>
      </div>
      <iframe class="hbr-vid" width="960" height="540" src="https://www.youtube.com/embed/AEN3rpyVoXE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</transition>
</template>

<script>
import router from '../router';

export default {
    name: 'lesson_test',
    data() {
        return {}
    },
    methods: {
        handleBack() {
            router.go(-1);
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

a {
    text-decoration: none;
}

.page-container {
    background: #f7f7f7;
}

.backdrop {
    background: $colorLightBlue;
    width: 100%;
    position: absolute;
    z-index: -1;
    bottom: 0px;
    animation: grow 1s ease forwards;
    display: flex;
    justify-content: space-between;
    color: white;
    opacity: 0;

    .vid-title {
        margin: 0px;
        padding: 0px;
        line-height: 10vh;
        position: absolute;
        width: 100%;
        z-index:-1;
    }
}

.hbr-vid {
    opacity: 0;
    background: white;
    border-radius: $rad;
    //border: solid 12px white;
    box-shadow: $softShadow;
    margin-top: -48px;
    animation: flyin 1s ease forwards;
}

@keyframes grow {
    from {
        height: 0vh;
        opacity: 0;
    }
    to {
        height: 10vh;
        opacity: 1;
    }
}

.bottom-button {
    //background: red;
    line-height: 10vh;
    padding: 0px 36px;
    display: flex;
    align-items: center;

    .back-button {
        //background: blue;
        border: 2px solid white;
        color: white !important;
        line-height: 24px;
        padding: 12px 24px;
        border-radius: $rad;
        cursor: pointer;
        font-weight: bold;

        &:hover {
            background: white;
            color: black !important;
        }
    }

    .quiz-button {
        background: white;
        color: black !important;
        line-height: 24px;
        padding: 12px 24px;
        border-radius: $rad;
        cursor: pointer;
        font-weight: bold;

        span {
            margin-left: 12px;
            color: black !important;
        }

        &:hover {
            transform: scale(1.05);
            box-shadow: $softShadow;
        }
    }
}

</style>