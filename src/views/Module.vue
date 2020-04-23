<template>
<!--transition name="mod" mode="out-in"-->
    <div class="mod-container" :class="(dark ? 'mod-dark' : '')">
      <h4>Lessons</h4>
      <div class="lesson-list-container">
          <div class="project-list">
              <ul style="padding:0px">
                  <router-link :to="completed[0] ? '' : '/about'"><li><div class="project-item item1" :class="completed[0] ? 'completed' : ''" ><div class="left"><strong>SSBO</strong><span>Strategic Sourcing</span></div><div class="right" :style="completed[0] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[0] ? '✓' : '🡒'}}</div></div></li></router-link>
                  <router-link :to="completed[1] ? '' : '/about'"><li><div class="project-item item2" :class="completed[1] ? 'completed' : ''" ><div class="left"><strong>SSBO</strong><span>SpendConnect</span></div><div class="right" :style="completed[1] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[1] ? '✓' : '🡒'}}</div></div></li></router-link>
                  <router-link :to="completed[2] ? '' : '/counsel_command'"><li><div class="project-item item3" :class="completed[2] ? 'completed' : ''" ><div class="left"><strong>SSBO</strong><span>CounselCommand</span></div><div class="right" :style="completed[2] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[2] ? '✓' : '🡒'}}</div></div></li></router-link>
                  <router-link :to="completed[3] ? '' : '/about'"><li><div class="project-item item4" :class="completed[3] ? 'completed' : ''" ><div class="left"><strong>S+O</strong><span>S+O Advisory</span></div><div class="right" :style="completed[3] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[3] ? '✓' : '🡒'}}</div></div></li></router-link>
                  <router-link :to="completed[4] ? '' : '/about'"><li><div class="project-item item5" :class="completed[4] ? 'completed' : ''" ><div class="left"><strong>S+O</strong><span>Survey</span></div><div class="right" :style="completed[4] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[4] ? '✓' : '🡒'}}</div></div></li></router-link>
                  <router-link :to="completed[5] ? '' : '/about'"><li><div class="project-item item1" :class="completed[5] ? 'completed' : ''" ><div class="left"><strong>SSBO</strong><span>Strategic Sourcing</span></div><div class="right" :style="completed[5] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[5] ? '✓' : '🡒'}}</div></div></li></router-link>
                  <router-link :to="completed[6] ? '' : '/about'"><li><div class="project-item item2" :class="completed[6] ? 'completed' : ''" ><div class="left"><strong>SSBO</strong><span>SpendConnect</span></div><div class="right" :style="completed[6] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{completed[6] ? '✓' : '🡒'}}</div></div></li></router-link>
              </ul>
          </div>
      </div>
    </div>
<!--/transition-->
</template>
 
<script>
import store from '../store';

export default {
    data() {
        return {
            completed: [
                true,
                true,
                false,
                false,
                false,
                false,
                false,
            ]
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
        },
        dark() {
            return store.state.dark;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/global-styles/variables.scss';

.completed {
    //background: green;
    //pointer-events: none;
    //color: white;

    .right {
        color: white !important;
        background: red;
    }
}

a {
    text-decoration: none;
    color: black !important;
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
    background-color: rgba(0, 0, 0, 0.12);
    //-webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}

.dark-mode::-webkit-scrollbar-thumb {
    background: #ffffff44 !important;
    border-radius: 24px;
}

.last-lesson {
    //animation: flyleft 800ms forwards ease 1s !important;
}

.mod-container {
    background: white;
    border-radius: $rad;
    padding: $gap;
    height: 390px;
    margin-left: -650px;
    margin-top: $gap / 2;
    //width: 100%;
    animation: flyleft 800ms forwards ease;
}

.lesson-list-container {
    background: white;
    height: 350px;
    width: 644px;
    border-radius: $rad;
    text-align: left;
    //opacity: 0;
    overflow: auto;
    //firefox scrollbar
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

    .project-item:hover, .completed:hover {
        background: #eeeeee !important;
        .right {
            background: #00000077 !important;
            color: white;
        }
    }

}

.mod-dark {
    background: $colorDarkLight;

    .lesson-list-container {
        background: $colorDarkLight !important;
        color: white !important;
    }

    a {
        color: white !important;
    }
    strong {
        font-weight: normal !important;
        opacity: 0.4 !important;
    }

    span {
        opacity: 1 !important;
    }

    .project-item:hover, .completed:hover {
        background: #00000044 !important;
        .right {
            background: #ffffff11 !important;
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
        padding-bottom: 12px;
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
            background: #ffffff22 !important;
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

//transition animation fade

.mod-enter, .mod-leave-to {
  opacity: 0;
  transform: scale(0);
}

.mod-enter-active, .mod-leave-active {
  transition: all 300ms ease;
}
</style>