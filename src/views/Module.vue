<template>
  <div class="page-container" :style="'background-color:' + color + ' !important'">
      <div class="lesson-list-container">
          <p class="lesson-list-title"><strong>Projects</strong></p>
          <div class="project-list">
              <ul>
                  <li><div class="project-item item1"><strong>SSBO</strong> - Strategic Sourcing</div></li>
                  <li><div class="project-item item2"><strong>SSBO</strong> - SpendConnect</div></li>
                  <li><div class="project-item item3"><strong>SSBO</strong> - Legal</div></li>
                  <li><div class="project-item item4"><strong>S+O</strong> - S+O Advisory</div></li>
                  <li><div class="project-item item5"><strong>S+O</strong> - Survey</div></li>
              </ul>
          </div>
      </div>
  </div>
</template>
 
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        color() {
            if(this.$route.params.current == 'managed_services') {
                return '#386C81'
            }
            else if(this.$route.params.current == 'advisory') {
                return '#7EB0AF'
            }
            else { //opreations
                return '#58A16D'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/global-styles/variables.scss';

.page-container {
    //background: blue;
    //height: 100vh;
    transition: 600ms;
}

.lesson-list-container {
    background: white;
    height: 460px;
    width: 600px;
    margin-left: 360px;
    border-radius: $rad;
    text-align: left;
    opacity: 0;
    animation: appear 1s forwards ease 600ms;


    p {
        padding-left: 24px;
    }

}

.lesson-list-title {
    margin-left: 12px;
    margin-top: 42px;
    margin-bottom: 0px;
}

@keyframes appear {
    from {
        //filter: invert(0);
        transform: translateY(164px);
        opacity: 0;
    }
    to {
        //filter: invert(1);
        transform: translateY(0px);
        opacity: 1;
    }
}

.project-list {
    .lesson-list-title {
        background: red !important;
    }
    project-item {
        display: inline;
    }   

    ul {
        list-style: none;
    }

    li {
        padding-top: 24px;
    }

    &:hover {
        background: yellow !important;
    }
}

.project-item {
    opacity: 0;
    margin-right: 32px;
    padding: 12px;
    border-radius: $rad;
}

.item1 { //active item
    animation: upwards 300ms forwards ease 0.4s;
    background: $colorLightBlue;
    color: white;
}

.item2 {
    animation: upwards 300ms forwards ease 0.6s;
}

.item3 {
    animation: upwards 300ms forwards ease 0.8s;
}

.item4 {
    animation: upwards 300ms forwards ease 1.0s;
}

.item5 {
    animation: upwards 300ms forwards ease 1.2s;
}

@keyframes upwards {
    from {
        opacity: 0;
        transform: translate(0px, 64px);
    }
    to {
        opacity: 1;
        transform: translate(0px, 0px);
    }
}
</style>