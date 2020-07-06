<template>
<div class="recent-container">
  <h4>{{title}}</h4>
      <div class="lesson-list-container" :class="(dark ? 'lesson-list-dark' : '')">
          <div class="project-list">
              <ul style="padding:0px">
                  <!--div v-for="(item, index) in topUsers" :key="index">
                    <li>
                        <div class="project-item" :class="'item' + (index + 1)">
                            <div class="left">
                                <div class="user-photo"></div>
                                <strong>{{ item.firstName + " " + item.lastName }}</strong>
                                <span style="font-weight: bold; opacity: 0.3!important">{{ item.totalProgress }}% Complete</span>
                            </div>
                            <div class="right" :class="'placing' + index" :style="'color:' + denote('color', index + 1) + '!important;background-color:' + denote('background', index + 1)">
                                <strong>{{ (index + 1) + denote('number', index + 1) }}</strong>
                            </div>
                        </div>
                    </li>
                  </div-->
                  <div class="empty">
                      <p>Leaderboard is empty</p>
                  </div>
              </ul>
          </div>
      </div>
</div>
</template>

<script>
import firebase from 'firebase';
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
      testColor2: '#7EAFAE',
      topUsers: []
    }
  },
  computed: {
    dark() {
      return store.state.dark;
    }
  },
  created() {
      this.getTopTen();
  },
  methods: {
      denote(context, position) {
          if(position == 1) {
              if(context == 'background') {
                  return '#38814D'
              }
              else if(context == 'number') {
                  return 'st'
              }
              else if(context == 'color') {
                  return 'white'
              }
              else {
                  return 0;
              }
          }
          else if(position == 2) {
              if(context == 'background') {
                  return '#386C81'
              }
              else if(context == 'number') {
                  return 'nd'
              }
              else if(context == 'color') {
                  return 'white'
              }
              else {
                  return 0;
              }
          }
          else if(position == 3) {
              if(context == 'background') {
                  return '#386C81'
              }
              else if(context == 'number') {
                  return 'rd'
              }
              else if(context == 'color') {
                  return 'white'
              }
              else {
                  return 0;
              }
          }
          else {
              if(context == 'background') {
                  return '#00000000'
              }
              else if(context == 'number') {
                  return 'th'
              }
              else if(context == 'color') {
                  return 'black'
              }
              else {
                  return 0;
              }
          }
      },
      getTopTen() { //get all users, and then sort from highest to lowest
          var self = this;
          firebase.firestore().collection("roles").orderBy("totalProgress").get().then((docs) => {
              docs.forEach((doc) => {
                  self.topUsers.push(doc.data());
              });
              self.topUsers.reverse();
              //console.log('top users: ', self.topUsers);
          });
      }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global-styles/variables.scss';

.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 140px;
    width: 100%;
    opacity: 0.5;
}

a {
  text-decoration: none;
  color: black !important;
}

.placing0 {
    opacity: 1;
}

.placing1 {
    opacity: 0.7;
}

.placing2 {
    opacity: 0.4;
}

.user-photo {
    background: black;
    border-radius: 100%;
    height: 36px;
    width: 36px;
    margin-right: $gap / 2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 130%;
    background-image: url('../../assets/profile.svg');
}

.right {
  background: $colorBlue;
  color: white;
}

.recent-container {
    text-align: center;
    padding: $gap;
    padding-bottom: 0px;
}

p {
    margin: 24px 0px;
}

.content {
  //background: #00000011;
  width: 100%;
  margin-top: $gap;
  //height: 300px;
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
    //height: 260px;
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

    .user-photo {
        filter: invert(1);
    }

    strong {
        font-weight: normal !important;
        color: white;
        //opacity: 0.6 !important;
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
        height: 36px;
        width: 52px;
        border-radius: 32px;
        margin: 0px;
        text-align: center;
        line-height: 36px;
    }

    .left {
        line-height: 32px;
        display: flex;
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
    //margin-right: 32px;
    padding: 12px;
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