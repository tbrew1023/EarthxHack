<template>
    <transition name="fade" mode="out-in">
        <div class="page-container">
            <div v-if="showScore" class="modal-container">
                <div class="modal score-modal">  

                    <CircleProgress
                        :score="true"
                        :percentage="80"
                        :progressColor="( !dark ? '#000000' : '#ffffff' )"
                        :circleColor="'rgba(0,0,0,0.06)'"
                        :strokeWidth="8"
                        :showNumber="true"
                        :separated="false"
                        class="circle-boi"
                    />

                    <!--h1 class="final-percent" :class="(this.pass ? 'pass' : (this.fail ? 'fail' : ''))">{{animatedProgress}}%</h1-->
                    <!--div class="score-bar">
                    <div class="juice-container">
                        <div class="juice">
                        <div class="juice-progress" :style="'width:' + finalPercent + '%'"></div>
                        </div>
                        <div class="juice-backdrop-container">
                        <div class="juice-empty"></div>
                        <div class="pass-marker"></div>
                        </div>
                    </div>
                    </div-->

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import CircleProgress from '../components/CircleProgress';
//import store from './store';

export default {
    name: 'Score',
    components: {
        CircleProgress
    },
    data() {

    },
    created() {

    },
    computed() {

    },
    methods() {

    }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

.circle-boi {
  animation: flyin 1s ease forwards;
  transition: 2s;
}

.pass {
  color: $colorGreen;
  font-weight: bold;
}

.fail {
  color: $colorRed;
  font-weight: bold;
}

.final-percent {
  opacity: 0;
  animation: flyin 1s ease forwards 0.5s;
  font-size: 64px;
  font-weight: normal;
  margin-bottom: $gap;
  margin-top: 0px;
  transition: 300ms;
}

.juice-progress {
  height: 12px;
  width: 0%;
  background: white;
  border-radius: $rad;
  animation: progress 2s ease forwards 1s;
}

.juice {
  position: absolute;
  //background: rgba(0,0,0,0.15);
  height: 12px;
  width: 285px;
  margin-left: auto;
  margin-right: auto;
  border-radius: $rad;
  left: 0;
  right: 0;
  margin-top: 6px;
  //z-index: 9999;
}

.juice-backdrop-container {
  //background: red;
  width: 100%;
  height: 24px;
  border-radius: $rad;
  display: flex;

  .juice-empty {
    background: $colorGray2;
    width: 85%;
    border-radius: $rad 0px 0px $rad;
  }

  .pass-marker {
    background: $colorGreen;
    width: 15%;
    border-radius: 0px $rad $rad 0px;
  }
}

.score-bar {
  //background: gray;
  width: 300px;
  height: 24px;
  border-radius: $rad;
  opacity: 0;
  animation: flyin 0.6s ease forwards 1s;
}

.modal-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: $colorBackdrop;
  z-index: 999;
  animation: flyin 600ms ease forwards;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 80%;
  height: 80%;
  border-radius: $rad;
  box-shadow: $softerShadow;
  z-index: 999;
}

.score-circle {
  opacity: 0;
  animation: flyin 1s forwards ease 1s;
}
</style>