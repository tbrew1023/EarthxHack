<template>
    <div class="content">
      <div class="module-card-container" :class="(!show ? 'gone' : '')">
        <div class="module-card-inner">
            <div :class="(darken ? 'darken' : '')" class="inner-module-card-top" :style="'background:' + color">
                <div class="pie-container">
                    <CircleProgress 
                        :single="true"
                        :percentage="percentage" 
                        :progressColor="'#ffffff'"
                        :circleColor="'rgba(0,0,0,0.06)'" 
                        :strokeWidth="8"
                        :showNumber="true"
                        :separated="false"
                    />
                </div>
                <h4>{{title}}</h4>
                <p>{{lessons}} projects</p>
            </div>
            <div class="inner-module-card-bottom" :style="'background:' + color">
                <div class="left"><span>Continue</span></div>
                <div class="right"><span>🡒</span></div>
            </div>  
        </div>    
      </div>
    </div>
</template>

<script>
import CircleProgress from '../CircleProgress';

export default {
  name: 'ModuleCard',
  props: {
      title: String,
      lessons: Number,
      path: String,
      color: String,
      percentage: Number,
      show: Boolean,
      darken: Boolean
  },
  components: {
      CircleProgress
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

$cardHeight: 450px;
$bottomHeight: 60px;

.page-container {
    //background: #eee;
}

.content {
    text-align: center !important;

    h1 {
        width: 100%;
    }
}

.module-card-container {
    margin: $gap / 2;
    width: 300px;
    height: $cardHeight;
    border-radius: $rad;
    color: white;
    background: black;
    transition: $animationSpeed;
    cursor: pointer;
}

.module-card {
    &:hover {
        //filter: brightness(0.9);
        //transform: scale(0.96);
        
        .module-card-container {
            box-shadow: 0px 6px 12px 6px #00000022;
            transform: scale(1.02);
        }

        .inner-module-card-bottom .right {
            transform: translateX(24px);
        }
    }
}

.inner-module-card-top {
    height: $cardHeight - 60px;
    border-radius: $rad $rad 0px 0px;
}

.inner-module-card-top-show {
    height: $cardHeight;
    border-radius: $rad $rad 0px 0px;
    //background: red !important;
    opacity: 0 !important;
}

.gone {
    transform: scale(0);
    opacity: 0;
    width: 0px;
    margin: 0px;
    padding: 0px;
    transition: 600ms;
    animation: disappear 1s forwards ease;
}

.darken {
    //background: red !important;
    //filter: brightness(0.9);
    //height: $cardHeight;
    //border-radius: $rad;
    
    .inner-module-card-top {
        .pie-container {
            //background: red !important;
            padding-top: 42px !important;
        }
    }

    .inner-module-card-bottom {
        //height: 0px;
        //color: rgba(0,0,0,0);
        //transition: 0ms;
    }
}

.inner-module-card-bottom {
    display: flex;
    opacity: 0.9;
    height: $bottomHeight;
    border-radius: 0px 0px $rad $rad;
    
    span {
        margin-right: 24px;
        line-height: $bottomHeight;
        //width: 100%;
    }

    .left {
        padding-left: 24px;
    }

    .right {
        transition: $animationSpeed;
    }
}

h4 {
    font-weight: normal;
    font-size: 18px;
    text-align: center;
    width: 100%;
    margin-top: -40px;
}

p {
    opacity: 0.4;
    margin-top: -12px;
}

.pie-container {
    width: 100%;
    transform: scale(0.6) translateY(-18px);
    padding-top: 20px;
}

@keyframes disappear {

}
</style>
