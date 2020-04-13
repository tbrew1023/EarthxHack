<template>
<div :class="dept" class="projectcard-container">
  <div class="card-left">
      <div class="module-box">
          <p>{{module}}</p>
      </div>
  </div>
  <div class="card-right">
    <p class="dept" v-if="
        module === 'SSBO' ||
        module === 'S+O' ||
        module === 'L-Tech' ||
        module === 'LT+I' ||
        module === 'IG'
    ">Advisory</p>
    <p class="dept" v-if="
        module === 'MS'
    ">Managed Services</p>
    <p class="dept" v-if="
        module === 'OPS'
    ">Operations</p>
    <div class="title-bottom"><h4>{{project}}</h4><strong>🡒</strong></div>
  </div>
</div>
</template>


<script>
export default {
  name: 'ProjectCard',
  props: {
    project: String,
    module: String,
    dept: String,
    color: String
  }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

$darkBoxSize: 60px;

.projectcard-container {
    display: flex;
    color: white;
    border-radius: $rad;
    margin-right: 24px;
    width: 100%;
    height: 100%;
    text-align: left;
    transition: 300ms;
    cursor: pointer;

    h4 {
      font-size: 18px;
      font-weight: normal;
    }

    &:hover {
      //filter: brightness(0.9);
      transform: scale(1.5);
      box-shadow: 0px 6px 12px 6px #00000022;

      strong {
        margin-left: 36px;
      }
    }
}

.card-left {
  //background: red;
  padding: $gap / 1.5;

  .module-box {
    background: #0000001f;
    border-radius: 9px;
    text-align: center;
    width: $darkBoxSize;
    height: $darkBoxSize;
    font-weight: bold;

    p {
        line-height: $darkBoxSize;
        margin: 0px;
    }
  }
}

.dept {
  opacity: 0.6;
  font-size: 14px;
  margin-top: 28px;
  margin-bottom: 8px;
}

.title-bottom {
  display: inline-flex;
  justify-content: space-between;
  -webkit-box-pack: justify;

  strong {
    margin-left: 18px;
    transition: 300ms;
  }
}

.Advisory {
  background: $colorLightBlue;
}

.ManagedServices {
  background: $colorBlue;
}

.Operations {
  background: $colorGreen;
}

</style>