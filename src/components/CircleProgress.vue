<template>
<div class="pie-options">

  <!-- 3 strokes -->

  <div v-if="separated && !single && !score" class="cp" :class="(!snap ? 'circle-progress': 'circle-progress-snap')" :style="{width:size+'px',height:size+'px'}" :data-pct="animatedProgress + '%'">
    <svg class="pie" :width="size" :height="size" :viewPort="'0 0 '+ size + ' ' + size" version="1.1" xmlns="http://www.w3.org/2000/svg"> 

      <circle class="ring" :stroke="(dark ? '#00000018' : '#f7f7f7')" :r="r*0.76" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none"></circle>
      <circle class="ring" :stroke="(dark ? '#00000018' : '#f7f7f7')" :r="r*0.88" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none"></circle>
      <circle class="ring" :stroke="(dark ? '#00000018' : '#f7f7f7')" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none"></circle>

      <circle id="po ring1" class="progress_circle progressOperations" :stroke="progressColorO" :r="r*0.76" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffsetO"></circle>
      <circle id="pm ring2" class="progress_circle progressManagedServices" :stroke="progressColorM" :r="r*0.88" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffsetM"></circle>
      <circle id="pa ring3" class="progress_circle progressAdvisory" :stroke="progressColorA" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffsetA"></circle>
      <!-- reordering -->
      <use id="use-bottom" :xlink:href="stackBottom" /> <!-- hihest percent -->
      <use id="use-mid" :xlink:href="stackMid" /> <!-- second heighest percent -->
      <use id="use-top" :xlink:href="stackTop" /> <!-- lowest percent -->
      
    </svg>
    <!--div class="gif earth"></div-->
  </div>

  <!-- single stroke -->

  <div v-if="!separated && !single && !score" class="cp" :class="(!snap ? 'circle-progress': 'circle-progress-snap')" :style="{width:size+'px',height:size+'px'}" :data-pct="animatedProgress + '%'">
    <svg class="pie" :width="size" :height="size" :viewPort="'0 0 '+ size + ' ' + size" version="1.1" xmlns="http://www.w3.org/2000/svg">
      
      <circle class="ring" :stroke="(dark ? '#00000018' : '#f7f7f7')" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none"></circle>

      <circle id="po" class="progress_circle progressOperations" :stroke="progressColorO" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffsetO"></circle>
      <circle id="pm" class="progress_circle progressManagedServices" :stroke="progressColorM" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffsetM"></circle>
      <circle id="pa" class="progress_circle progressAdvisory" :stroke="progressColorA" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffsetA"></circle>
      <!-- reordering -->
      <use id="use-bottom" :xlink:href="stackBottom" /> <!-- hihest percent -->
      <use id="use-mid" :xlink:href="stackMid" /> <!-- second heighest percent -->
      <use id="use-top" :xlink:href="stackTop" /> <!-- lowest percent -->
    </svg>
  </div>

  <!-- single value -->

  <div v-if="single && !score" class="circle-progress cp" :style="{width:size+'px',height:size+'px'}" :data-pct="animatedProgress + '%'">
    <svg class="pie" :width="size" :height="size" :viewPort="'0 0 '+ size + ' ' + size" version="1.1" xmlns="http://www.w3.org/2000/svg">
      
      <circle class="ring" stroke="#00000011" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none"></circle>

      <circle id="p" class="progress_circle progressSingle" :stroke="progressColor" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"></circle>
    </svg>
  </div>

  <!-- quiz score -->

  <div v-if="score" class="circle-progress cp score-circle" :class="(pass ? 'score-circle-pass' : (this.fail ? 'score-circle-fail' : ''))" :style="{width:size+'px',height:size+'px'}" :data-pct="animatedProgress + '%'">
    <svg class="pie" :width="size" :height="size" :viewPort="'0 0 '+ size + ' ' + size" version="1.1" xmlns="http://www.w3.org/2000/svg">
      
      <circle class="ring" stroke="#00000011" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none"></circle>

      <circle id="p" :class="'scp'" class="progress_circle progressSingle score-stroke" :stroke="(pass ? '#58A16D' : (fail ? '#A41533' : ( dark ? 'white' : 'black' )))" :r="r" :cx="size/2" :cy="size/2" :stroke-width="strokeWidth" fill="none" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset"></circle>
    </svg>
  </div>
</div>
</template>

<script>
import store from '../store'

export default {
  name: "CircleProgress",
  data() {
    return {
      animatedProgress: 0,
      stackTop: "",
      stackMid: "",
      stackBottom: "",
      percentageShrunkA: null,
      percentageShrunkM: null,
      percentageShrunkO: null,
    };
  },
  props: {
    pass: {
      type: Boolean,
      default: false
    },
    fail: {
      type: Boolean,
      default: false
    },
    score: {
      type: Boolean,
      default: false
    },
    gif: {
      type: String
    },
    snap: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 300
    },
    percentage: {
      type: Number,
      default: 0,
      validator: val => {
        return val <= 100;
      }
    },
    percentageA: {
      type: Number,
      default: 0,
      validator: val => {
        return val <= 100;
      }
    },
    percentageM: {
      type: Number,
      default: 0,
      validator: val => {
        return val <= 100;
      }
    },
    percentageO: {
      type: Number,
      default: 0,
      validator: val => {
        return val <= 100;
      }
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    ringColor: {
      type: String,
      default: "#f7f7f7"
    },
    progressColor: {
      type: String,
      default: "#ffffff"
    },
    progressColorA: {
      type: String,
      default: "#08D7B8"
    },
    progressColorM: {
      type: String,
      default: "#ff0000"
    },
    progressColorO: {
      type: String,
      default: "#00ff00"
    },
    showNumber: {
      type: Boolean,
      default: true
    },
    separated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dark() {
      return store.state.dark;
    },
    r() {
      return this.size / 2 - this.strokeWidth / 2;
    },
    dasharray() {
      return 2 * Math.PI * this.r;
    },

    dashoffset() {
      return (this.dasharray * (1 - this.percentage / 100));
    },
    dashoffsetA() {
      return (this.dasharray * (1 - this.percentageA / (!this.separated ? 100 * this.shrinkFactor : 100)));
    },
    dashoffsetM() {
      return (this.dasharray * (1 - this.percentageM / (!this.separated ? 100 * this.shrinkFactor : 100)));
    },
    dashoffsetO() {
      return (this.dasharray * (1 - this.percentageO / (!this.separated ? 100 * this.shrinkFactor : 100)));
    },

    progressNumber() {
      return this.showNumber && parseInt(this.percentTotal);
    },
    shrinkFactor() {
      var percentages = [
        this.percentageA,
        this.percentageM,
        this.percentageO
      ];

      percentages.sort();
      //console.log("percentages sorted: " + percentages);

      //console.log("shrink factor" + percentages[2] / this.percentTotal);

      return (percentages[2] / this.percentTotal);
    },
    percentTotal() {
      return (!this.single ? (parseInt((this.percentageA + this.percentageM + this.percentageO) / 3)) : this.percentage);
    }
  },
  created() {

  },
  mounted() {
      setTimeout(() => {
        this.reorder();
        this.animatePercent();
      }, 1000); //hang time for async
  },
  methods: {
    reorder() {
      var sizes = [
        this.percentageA + "pa",
        this.percentageM + "pm",
        this.percentageO + "po",
      ];

      //console.log("pre-sort: " + sizes);
      var sorted = sizes.sort();
      //console.log("post-sort: " + sizes);
      
      this.stackBottom = "#" + sorted[2].slice(-2);
      this.stackMid = "#" + sorted[1].slice(-2);
      this.stackTop = "#" + sorted[0].slice(-2);

      /*console.log("bottom: " + this.stackBottom);
      console.log("mid: " + this.stackMid);
      console.log("top: " + this.stackTop);*/

      this.percentageShrunkA = this.percentageA / this.shrinkFactor;
      this.percentageShrunkM = this.percentageM / this.shrinkFactor;
      this.percentageShrunkO = this.percentageO / this.shrinkFactor;
    },
    animatePercent() {
      var self = this;
      var count = 0;
      var up = setInterval(() => {
        this.animatedProgress = count;
        count++;
        //console.log("percentage: " + this.percentTotal);
      }, 1500 / this.percentTotal);
      setTimeout(() => {
        clearInterval(up);
        self.animatedProgress = this.percentTotal;
        //console.log(this.percentage);
      }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
$colorGreen: #58A16D;
$colorRed: #A41533;

.score-circle-pass:after {
  content: attr(data-pct);
  font-size:48px;
  font-weight: 900;
  width:100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: $colorGreen;
  transition: 300ms;
}

.score-circle-fail:after {
  content: attr(data-pct);
  font-size:48px;
  font-weight: 900;
  width:100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: $colorRed;
  transition: 300ms;
}

.ring2 {
  transform: rotate(45deg);
}

.ring3 {
  transform: rotate(90deg);
}

.cp {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gif {
  //background: rgba(black, 0.1);
  width: 140px;
  height: 140px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
}

.earth {
    background-image: url('../assets/gifs/earth.gif');
}

.land {
    background-image: url('../assets/gifs/blake-plant.gif');
}

.air {
    background-image: url('../assets/gifs/cloud.gif');
}

.sea {
    background-image: url('../assets/gifs/catfish.gif');
}

.circle-progress, .circle-progress-snap {
  position: relative;
  text-align: center;
}
.circle-progress:after, .circle-progress-snap:after {
  content: attr(data-pct);
  font-size:48px;
  font-weight: 900;
  width:100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.circle-progress, .circle-progress-snap {
  svg {
    transform: rotate(-90deg);
  }
}
.circle-progress .progress_circle {
  stroke-linecap: round;
  transition: stroke-dashoffset 2s ease;
  transition-delay: 600ms;
}

.circle-progress-snap {
  stroke-linecap: round;
}

use {
  transition: 5s ease;
}

.circle-percentage {
  font-size: 75%;
}

circle {
  stroke-linecap: round;
}

.pie {
  transform: rotate(0deg) !important;
}

.score-circle {
  //animation: score-boi 2s ease forwards 1s;
  transition: 300ms;
}

.scp {
  opacity: 0;
  animation: score-boi 2s ease forwards 1s;
}

.scf {

}

@keyframes score-boi {
  0% {
    stroke-dashoffset: 918;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes score-boi-pass {
  0% {
    stroke-dashoffset: 918;
    opacity: 0;
    //stroke: black;
  }
  100% {
    opacity: 1;
    //stroke: $colorGreen;
  }
}

@keyframes score-boi-fail {
  0% {
    stroke-dashoffset: 918;
    opacity: 0;
    //stroke: black;
  }
  100% {
    opacity: 1;
    //stroke: $colorRed;
  }
}

@keyframes colorize {
  0% {
    //stroke: black;
  }
}

</style>