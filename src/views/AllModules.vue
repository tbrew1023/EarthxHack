<template>
<transition name="fade" mode="out-in">
  <div class="page-container">
    <!--div class="backdrop"><div class="wave"></div></div-->
    <div class="content">
        <div class="module-cards-container">
            <router-link 
                v-on:click.native="handleModuleClick('a')" 
                :to="(moduleClick ? '' :'all_modules/advisory')" 
                :class="(!moduleClick ? '' : 'selected-card')"
                >
                <ModuleCard 
                    :class="(darken ? 'darken' : '')"
                    class="module-card module-card1"
                    title="Advisory"
                    path="/advisory"
                    :lessons="16"
                    color="#7EB0AF"
                    :percentage="userRef.progressAdvisory"
                    :show="a || !moduleClick" 
                    :darken="darken"
                />
            </router-link>
            <router-link 
                v-on:click.native="handleModuleClick('m')" 
                :to="(moduleClick ? '' :'all_modules/managed_services')" 
                :class="(!moduleClick ? '' : 'selected-card')"
                >
                <ModuleCard 
                    :class="(darken ? 'darken' : '')"
                    class="module-card module-card2"
                    title="Managed Services"
                    path="/managed_services"
                    :lessons="6"
                    color="#386C81"
                    :percentage="userRef.progressManagedServices"
                    :show="m || !moduleClick"
                    :darken="darken"
                />
            </router-link>
            <router-link 
                v-on:click.native="handleModuleClick('o')" 
                :to="(moduleClick ? '' :'all_modules/operations')" 
                :class="(!moduleClick ? '' : 'selected-card')"
                >
                <ModuleCard 
                    :class="(darken ? 'darken' : '')"
                    class="module-card module-card3"
                    title="Operations"
                    path="/operations"
                    :lessons="7"
                    color="#58A16D"
                    :percentage="userRef.progressOperations"
                    :show="o || !moduleClick"
                    :darken="darken"
                />
            </router-link>
      </div>
    <router-view></router-view>
    </div>
  </div>
</transition>
</template>

<script>
import firebase from "firebase";
import ModuleCard from '@/components/user_dash/ModuleCard';
import store from '../store';

export default {
  name: 'AllModules',
  components: {
      ModuleCard
  },
  data() {
      return {
            darken : false,
            clicked: false,
            m: true,
            a: true,
            o: true,
            user: null,
            userRef: {
                firstName: "",
                lastName: "",
                fullName: "",
                email: "",
                totalProgress: 0,
                progressAdvisory: 0,
                progressManagedServices: 0,
                progressOperations: 0,
                companyRole: ""
            }
      };
  },
  created() {
    this.a = true;
    this.m = true;
    this.o = true;
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
        self.user = user;
        //console.log(self.user.uid);
        firebase.firestore().collection("roles").doc(self.user.uid).get().then((doc) => {
            //console.log(doc.data().displayName);
            self.userRef.firstName = doc.data().firstName;
            self.userRef.lastName = doc.data().lastName;
            self.userRef.fullName = (self.userRef.firstName + " " + self.userRef.lastName);
            self.userRef.email = self.user.email;
            self.userRef.totalProgress = doc.data().totalProgress;
            self.userRef.progressAdvisory = doc.data().progressAdvisory;
            self.userRef.progressManagedServices = doc.data().progressManagedServices;
            self.userRef.progressOperations = doc.data().progressOperations;
            self.userRef.companyRole = doc.data().companyRole;
            //console.log('ope: ' + self.$route.params.current);
        });
    })
  },
  computed: {
      moduleClick() {
          return store.state.moduleClick;
      },
      navClick() {
          return store.state.modulePage;
      }
  },
  methods: {
    handleBack() {
        this.clicked = false;
        store.commit('modulePage');
    },
    toggleModules() {
        store.commit('moduleClick');
        this.darken = true;
    },
    handleModuleClick(title) {
        this.clicked = true;
        this.toggleModules();
        console.log('module clicked?: ' + this.moduleClick);
        console.log('nav clicked?: ' + this.navClick);
        if(title == 'm') {
            this.m = true;
            this.a = false;
            this.o = false;
            this.toggleModules;
        }
        else if(title == 'a') {
            this.a = true;
            this.m = false;
            this.o = false;
            this.toggleModules;
            
        }
        else { // if operations clicked
            this.o = true;
            this.a = false;
            this.m = false;
            this.toggleModules;
        }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';
.page-container {
    background: $colorBackdrop;
    a {
        text-decoration: none !important;
    }
}

.backdrop {
    background: #f8f8f8;
    width: 100%;
    height: 40vh;
    position: absolute;
    bottom: 0px;
    z-index: -1;
    display: flex;
    justify-content: center;

    .wave {
        //background: green;
        width: 100vw;
        height: 200px;
        margin-top: -200px;
        background-image: url("../assets/wave.svg");
        background-size: contain;
        background-repeat: repeat-x;
        background-position-x: 600px;
        //animation: wave 3s ease forwards;    
    }

}

.content {
    text-align: center;
    display: flex;
}
.module-cards-container {
    //background: red;
    display: flex;
    width: 996px;
    transition: 3s;
}
.module-card {
    opacity: 0;
}
.module-card1 {
    animation: flyup $pageTransitionSpeed ease forwards;
    //animation-delay: 0.2s;
}
.module-card2 {
    animation: flyup $pageTransitionSpeed ease forwards;
    animation-delay: 0.2s;
}
.module-card3 {
    animation: flyup $pageTransitionSpeed ease forwards;
    animation-delay: 0.4s;
}
.selected-card {
    pointer-events: none;
    //margin: 16px;
}
.back-button {
    //background: red;
    cursor: pointer;
}
.darken {
    //filter: brightness(0.9);
}
</style>