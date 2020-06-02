<template>
<!--transition name="mod" mode="out-in"-->
    <div class="mod-container" :class="(dark ? 'mod-dark' : '')">
      <h4>Lessons</h4>
      <div class="lesson-list-container">
          <div class="project-list">
              <ul style="padding:0px">
                  <!-- why are vertical ternaries so pretty yet so ugly -->
                  <router-link
                  
                    v-for="(item, index) in 
                    ( 
                        $route.params.current == 'advisory'
                        ? 
                        quizzes.advisory
                        : 
                        (
                            $route.params.current == 'managed_services' 
                            ?
                            quizzes.managedServices 
                            : 
                            quizzes.operations 
                        )
                    )" 

                    :to="'/' + item.lessonID"
                    
                    :key="item.i"
                    
                    >

                    <li><div class="project-item" :class="(completed[0] ? 'completed' : '')" :style="'animation: flyin 300ms forwards ease ' + parseFloat(index / 6) + 's'" > 
                        <div class="left"><strong>{{ item.practiceGroup }}</strong><span>{{ item.serviceLine }}</span></div>
                        <div class="right" :style="completed[index] ? 'background-color:' + color + ' !important' : 'background-color:#00000000'">{{ completed[index] ? '✓' : '🡒' }}</div>
                    </div></li>

                </router-link>
              </ul>
          </div>
      </div>
    </div>
<!--/transition-->
</template>
 
<script>
import store from '../store';
import firebase from 'firebase';

export default {
    data() {
        return {
            completed: [

            ],
            quizzes: {
                advisory: [],
                managedServices: [],
                operations: []
            },
            contextSorted: []
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
    },
    created() {
        this.fetchQuizzes();
    },
    methods: {
        fetchQuizzes() {
            var self = this;
            console.log('fetching lessons');
            firebase.firestore().collection('HBRC_quizzes').get().then((docs) => {
                docs.forEach((doc) => {
                    console.log();
                    console.log(doc.data());
                    console.log();
                    if(doc.data().module == 'Advisory') {
                        self.quizzes.advisory.push(doc.data());
                    }
                    else if(doc.data().module == 'Managed Services') {
                        self.quizzes.managedServices.push(doc.data());
                    }
                    else if(doc.data().module == 'Operations') {
                        self.quizzes.operations.push(doc.data());
                    }
                    else {
                        console.error('Unkown module');
                    }
                });
                console.log();
                console.log('quizzes fetched: ');
                console.log(self.quizzes.advisory);
                console.log(self.quizzes.managedServices);
                console.log(self.quizzes.operations);

                // ---------- filter quizzes ----------
                
                self.filterQuizzes(self.quizzes.advisory);
                self.filterQuizzes(self.quizzes.managedServices);
                self.filterQuizzes(self.quizzes.operations);
            });
        },
        filterQuizzes(context) {
            const na = [...new Set(context)]; // set

            var sorted = [];
            var trash = [];
        
            na.forEach((item) => {
                if(!trash.includes(item.serviceLine)) {
                    sorted.push({practiceGroup: item.practiceGroup, serviceLine: item.serviceLine, lessonID: item.lessonID});
                    trash.push(item.serviceLine);
                    console.log(item.serviceLine);
                }
            });
            
            if(context == this.quizzes.advisory) { //advisory
                this.quizzes.advisory = sorted;
            }
            else if(context == this.quizzes.managedServices) { //managedServices
                this.quizzes.managedServices = sorted;
            }
            else { //operations
                this.quizzes.operations = sorted;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/global-styles/variables.scss';

h4 {
  padding: $gap 0px 0px $gap;
}

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

.last-lesson {
    //animation: flyleft 800ms forwards ease 1s !important;
}

.mod-container {
    //display: none;
    background: white;
    border-radius: $rad;
    height: 390px;
    margin-left: -650px;
    margin-top: $gap / 2;
    //width: 100%;
    animation: flyleft 800ms forwards ease;
    padding-bottom: $gap;
}

.lesson-list-container {
    background: white;
    height: 375px;
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
    margin-right: $gap;
    margin-left: $gap;
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

//transition animation fade

.mod-enter, .mod-leave-to {
  opacity: 0;
  transform: scale(0);
}

.mod-enter-active, .mod-leave-active {
  transition: all 300ms ease;
}
</style>