<template>
<div class="badges-container">
  <h4>{{title}}</h4>
  <div class="badges-container-inner">
  </div>
</div>
</template>

<script>
export default {
  name: 'Badges',
  props: {
    user: Object,
    title: String
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

p {
    margin: 24px 0px;
}
</style>