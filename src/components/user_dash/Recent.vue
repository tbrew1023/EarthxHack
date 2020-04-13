<template>
<div class="recent-container">
  <h4>{{title}}</h4>
  <div class="content">

  </div>
</div>
</template>

<script>
export default {
  name: 'Recent',
  props: {
    user: Object,
    title: String
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

.recent-container {
    text-align: center;
    padding: $gap;
}

p {
    margin: 24px 0px;
}

.content {
  //background: #00000011;
  width: 100%;
  margin-top: $gap;
  height: 300px;
  border-radius: 9px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('../../assets/recents.svg');
  transform: scale(0.9);
}
</style>