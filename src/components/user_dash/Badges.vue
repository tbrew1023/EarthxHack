<template>
<div class="badges-container" :class="(dark ? 'dark' : '')">
  <div class="count module-count">
    <div class="count-inner">
      <div class="top"><span>Modules Completed</span></div>
      <div class="bottom"><span>8</span><div class="wave green-wave"></div></div>
    </div>
  </div>
  <div class="count lesson-count">
    <div class="count-inner">
      <div class="top"><span>Lessons Completed</span></div>
      <div class="bottom"><span>17</span><div class="wave blue-wave"></div></div>
    </div>
  </div>
</div>
</template>

<script>
import store from '../../store';

export default {
  name: 'Badges',
  props: {
    user: Object,
    title: String
  },
  computed: {
    dark() {
      return store.state.dark;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

.badges-container {
    text-align: center;
    //padding: $gap;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $gap;
    height: 100%;
}

.wave {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.green-wave {
  background-image: url("../../assets/green-wave.svg");
}

.blue-wave {
  background-image: url("../../assets/blue-wave.svg");
  width: 120px !important;
}

.module-count {
  color: $colorGreen !important;
}

.lesson-count {
  color: $colorBlue !important;
}

.dark {
  .count-inner {
    background: $colorDarkLight !important;
    color: white;
  }
}

.count {
  //background: white;
  width: 100%;
  height: 100%;
  text-align: left;
  box-shadow: $softerShadow;

  .count-inner {
    display:flex;
    flex-direction: column;
    height: 100%;
    border-radius: $rad;
    background: white;

    .top {
      height: auto;
      padding: $gap;
    }

    .bottom {
      padding: $gap;
      font-weight: bold;
      font-size: 36px;
      height: auto;
      margin-top: auto;
      display: flex;

      .wave {
        //background: gray;
        width: 100px;
        height: 50px;
        margin-left: 24px;
      }
    }
  }
}

.badges-container-inner {
  //background: red;
  height: 100px;
  width: 100%;
  background-image: url("../../assets/badges.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: -28px;
  transform: scale(0.8);
}

.badges-container-inner-dark {
  //background: red;
  height: 100px;
  width: 100%;
  background-image: url("../../assets/badges.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: -28px;
  transform: scale(0.8);
  opacity: 0.05;
}

p {
    margin: 24px 0px;
}


</style>