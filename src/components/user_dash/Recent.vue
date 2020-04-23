<template>
<div class="recent-container">
  <h4>{{title}}</h4>
      <div class="lesson-list-container" :class="(dark ? 'lesson-list-dark' : '')">
          <div class="project-list">
              <ul style="padding:0px">
                  <router-link to="/about"><li><div class="project-item item1"><div class="left"><strong>SSBO</strong><span>Strategic Sourcing</span></div><div class="right" :style="'background-color:'+testColor1">✓</div></div></li></router-link>
                  <router-link to="/about"><li><div class="project-item item2"><div class="left"><strong>SSBO</strong><span>SpendConnect</span></div><div class="right">✓</div></div></li></router-link>
                  <router-link to="/about"><li><div class="project-item item3"><div class="left"><strong>SSBO</strong><span>Legal</span></div><div class="right">✓</div></div></li></router-link>
                  <router-link to="/about"><li><div class="project-item item4"><div class="left"><strong>S+O</strong><span>S+O Advisory</span></div><div class="right">✓</div></div></li></router-link>
                  <router-link to="/about"><li><div class="project-item item5"><div class="left"><strong>S+O</strong><span>Survey</span></div><div class="right" :style="'background-color:'+testColor2">✓</div></div></li></router-link>
                  <router-link to="/about"><li><div class="project-item item1"><div class="left"><strong>SSBO</strong><span>Strategic Sourcing</span></div><div class="right" :style="'background-color:'+testColor2">✓</div></div></li></router-link>
                  <router-link to="/about"><li><div class="project-item item2"><div class="left"><strong>SSBO</strong><span>SpendConnect</span></div><div class="right" :style="'background-color:'+testColor2">✓</div></div></li></router-link>
              </ul>
          </div>
      </div>
</div>
</template>

<script>
import store from '../../store';

export default {
  name: 'Recent',
  props: {
    user: Object,
    title: String
  },
  data() {
    return {
      testColor1: '#58A06D',
      testColor2: '#7EAFAE'
    }
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

a {
  text-decoration: none;
  color: black !important;
}

.right {
  background: $colorBlue;
  color: white;
}

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

//scrollbar things (chrome)

::-webkit-scrollbar {
    width: 32px;
}

::-webkit-scrollbar-track {
    background: transparent;
    border: none;
}

::-webkit-scrollbar-thumb {
    border: 12px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    -webkit-border-radius: 24px;
    background-color: gray;
    //-webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}

.dark-mode::-webkit-scrollbar-thumb {
    background: #ffffff44 !important;
    border-radius: 24px;
}

.last-lesson {
    animation: flyleft 800ms forwards ease 1s !important;
}

.lesson-list-container {
    background: white;
    height: 316px;
    width: 100%;
    border-radius: $rad;
    text-align: left;
    opacity: 0;
    animation: flyleft 800ms forwards ease;
    overflow: auto;
    //firefox scrollbar things
    overflow-y: scroll;
    scrollbar-color: gray transparent;
    scrollbar-width: thin;

    p {
        padding-left: 24px;
    }

    strong {
        font-weight: bold !important;
        opacity: 1 !important;
    }

    span {
        opacity: 0.6 !important;
    }

    .project-item:hover {
        background: #eeeeee;
        .right {
            background: #00000077;
            color: white;
        }
    }

}

.lesson-list-dark {
    background: $colorDarkLight !important;
    color: white !important;

    strong {
        font-weight: normal !important;
        color: white;
        opacity: 0.6 !important;
    }

    span {
        opacity: 1 !important;
    }

    .project-item:hover {
        background: #00000044;
        .right {
            background: #ffffff11;
            //color: black;
        }
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
    //padding-bottom: 24px;

    .lesson-list-title {
        background: red !important;
    }
    .project-item {
        display: flex;
        justify-content: space-between;
    }   

    .right {
        //background: red;
        height: 32px;
        width: 32px;
        border-radius: 100%;
        margin: 0px;
        text-align: center;
        line-height: 32px;
    }

    .left {
        line-height: 32px;
    }

    ul {
        list-style: none;
    }

    li {
        padding-bottom: 18px;
    }

    &:hover {
        //background: yellow !important;
    }
}

li {
    cursor: pointer !important;
    
    &:hover {
        //background: red !important;
    }
}

.project-item {
    opacity: 0;
    margin-right: 32px;
    padding: 12px 12px 12px 24px;
    border-radius: $rad * 2;
    cursor: pointer;
    transition: 150ms;

    strong {
        opacity: 0.4;
        font-weight: normal;
    }

    span {
        opacity: 1;
        margin-left: 12px;
    }

    &:hover {
        background: rgba(0,0,0,0.1);

        .right {
            background: #ffffff22;
        }
    }
}

.item1 { //active item
    animation: flyin 300ms forwards ease 0.4s;
    //background: rgba(0,0,0,0.12);
    //color: black;
}

.item2 {
    animation: flyin 300ms forwards ease 0.6s;
}

.item3 {
    animation: flyin 300ms forwards ease 0.8s;
}

.item4 {
    animation: flyin 300ms forwards ease 1.0s;
}

.item5 {
    animation: flyin 300ms forwards ease 1.2s;
}
</style>