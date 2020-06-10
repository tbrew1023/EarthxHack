<template>
<div class="welcome-container">
  <!--div class="earth"></div-->
  <div class="text-stuff">
    <h2 class="greetings">Welcome back {{claims.given_name}}!</h2>
    <p>You've completed <strong>X%</strong> of your last module!</p>
    <div class="continue-button"><span>Continue</span><strong>🡒</strong></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    user: Object,
    claims: Object
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

.earth {
  background: rgba(black, 0.1);
  width: 140px;
  height: 140px;
  margin-right: $gap;
  border-radius: 100%;
  background-image: url('../../assets/gifs/earth.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.welcome-container {
    text-align: left;
    padding: $gap;
    //border: 2px solid #ff722211;
    border-radius: $rad;
    display: flex;
}

.continue-button {
    background: $colorBlue;
    width: max-content;
    color: white;
    padding: 8px 24px;
    border-radius: calc(#{$rad});
    cursor: pointer;
    transition: $animationSpeed;
    border: 2px solid $colorBlue;
    font-weight: bold;
     
    strong {
      padding-left: 8px;
      transition: padding 300ms;
    }

    &:hover {
        background: transparent;
        color: $colorBlue;

        strong {
          padding-left: 8px;
        }
    }
}

h2 {
    color: $colorBlue;
    margin-top: -6px;
}

p {
    margin: 24px 0px 24px 0px;
}
</style>