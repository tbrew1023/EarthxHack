<template>
<div class="total-container">
    <div class="card-top">
        <h4>{{title}}</h4>
        <div class="chart-buttons">
            <div :class="(!singleActive ? 'chart-button-active' : 'chart-button-inactive')" v-on:click="() => { singleActive = false }" class="chart-button chart-button-multi"></div>
            <div :class="(singleActive ? 'chart-button-active' : 'chart-button-inactive')" v-on:click="() => { singleActive = true }" class="chart-button chart-button-single"></div>
        </div>
    </div>
    <div class="content-container">
        <div class="chart-container">
            <CircleProgress 
                :snap="snap"
                :single="false"
                :percentageA="user.progressAdvisory"
                :percentageM="user.progressManagedServices"
                :percentageO="user.progressOperations" 
                :progressColorA="'#7EB0AF'"
                :progressColorM="'#386C81'"
                :progressColorO="'#58A16D'"
                :circleColor="'rgba(0,0,0,0.06)'" 
                :strokeWidth="8"
                :showNumber="true"
                :separated="!singleActive"
            />
        </div>
    </div>
    <div class="key-container">
        <div class="key key1"><div class="key-color"><span>{{user.progressAdvisory}}%</span></div>Advisory</div>
        <div class="key key2"><div class="key-color"><span>{{user.progressManagedServices}}%</span></div>Managed Services</div>
        <div class="key key3"><div class="key-color"><span>{{user.progressOperations}}%</span></div>Operations</div>
    </div>
</div>
</template>

<script>
import CircleProgress from '../CircleProgress';

export default { 
  name: 'Total',
  props: {
    user: Object,
    title: String
  },
  components: {
      CircleProgress
  },
  data() {
      return {
          percent: 0,
          singleActive: false,
          snap: false,
      }
  },
  created() {
      //console.log("created chart");
  },
  mounted() {
      //console.log("user progress: " + this.user.totalProgress);
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

.total-container {
    text-align: center;
    padding: $gap;
}

.content-container {
    //background: blue;
    width: 100%;
    height: -webkit-fill-available;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:-24px;

    .chart-container {
        //background: red;
        width: 324px;
        height: 324px;  
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -44px;

        text {
            font-size: 60pt;
            fill: black;
        }
    }

    #chart {
        height: 100%;
        width: 100%;
        background: green;
    }
}

.key-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -52px;

    .key {
        margin-left: 2px;
        margin-right: 12px;
        display: flex;
        font-weight: bold;
    }

    .key-color {
        background: black;
        border-radius: 24px;
        height: 24px;
        width: 42px;
        margin-right: 12px;
        margin-top: -1px;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
        //font-weight: bold;
        
        span {
            color: white !important;
            font-size: 14px;
        }
    }

    .key1 {
        color: $colorLightBlue;
        
        .key-color {
            background: $colorLightBlue;
        }
    }

    .key2 {
        color: $colorBlue;
        
        .key-color {
            background: $colorBlue;
        }
    }

    .key3 {
        color: $colorGreen;
        
        .key-color {
            background: $colorGreen;
        }
    }

}

p {
    margin: 24px 0px;
}

.card-top {
    display: flex;
    justify-content: space-between;

    .chart-buttons {
        display: inline-flex;

        .chart-button {
            //background: blue;
            height: 24px;
            width: 24px;
            margin-left: 16px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
            opacity: 0.4;
            transition: $animationSpeed;

            &:hover {
                opacity: 0.6;
            }
        }

        .chart-button-active {
            opacity: 1;
        }

        .chart-button-inactive {
            opacity: 0.3;
        }

        .chart-button-single {
            background-image: url('../../assets/icons/single_stroke.svg');
        }

        .chart-button-multi {
            background-image: url('../../assets/icons/multi_stroke.svg');
        }
    }
}
</style>