<template>
<div class="badges-container">
  <h4>{{title}}</h4>
  <div :class="(!dark ? 'badges-container-inner' : 'badges-container-inner-dark')">
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
    padding: $gap;
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