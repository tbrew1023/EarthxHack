<template>
<div class="welcome-container">
  <h2>Welcome back {{user.firstName}}!</h2>
  <p>You've completed <strong>X%</strong> of your last module!</p>
  <div class="continue-button"><span>Continue</span><strong>🡒</strong></div>
</div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    user: Object
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

.welcome-container {
    text-align: left;
    padding: $gap;
    border: 2px solid #ff722211;
    border-radius: $rad;
}

.continue-button {
    background: $colorOrange;
    width: max-content;
    color: white;
    padding: 8px 24px;
    border-radius: calc(#{$rad});
    cursor: pointer;
    transition: $animationSpeed;
    border: 2px solid $colorOrange;
    font-weight: bold;
     
    strong {
      padding-left: 8px;
      transition: padding 300ms;
    }

    &:hover {
        background: transparent;
        color: $colorOrange;

        strong {
          padding-left: 8px;
        }
    }
}

h2 {
    color: $colorOrange;
    margin-top: -6px;
}

p {
    margin: 24px 0px 24px 0px;
}
</style>