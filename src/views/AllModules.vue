<template>
<transition name="fade" mode="out-in">
  <div class="page-container">
    <div class="content">
        <div class="module-cards-container">
            <router-link v-on:click.native="handleModuleClick('m')" :to="(clicked ? '' :'all_modules/managed_services')" :class="(!clicked ? '' : 'selected-card')">
                <ModuleCard v-if="m || !moduleClick" :class="(darken ? 'darken' : '')"
                    class="module-card module-card2"
                    title="Managed Services"
                    path="/managed_services"
                    :lessons="6"
                    color="#386C81"
                    :percentage="userRef.progressManagedServices"
                    :show="m"
                    :darken="darken"
                />
            </router-link>
            <router-link v-on:click.native="handleModuleClick('a')" :to="(clicked ? '' :'all_modules/advisory')" :class="(!clicked ? '' : 'selected-card')">
                <ModuleCard v-if="a || !moduleClick" :class="(darken ? 'darken' : '')"
                    class="module-card module-card1"
                    title="Advisory"
                    path="/advisory"
                    :lessons="16"
                    color="#7EB0AF"
                    :percentage="userRef.progressAdvisory"
                    :show="a" 
                    :darken="darken"
                />
            </router-link>
            <router-link v-on:click.native="handleModuleClick('o')" :to="(clicked ? '' :'all_modules/operations')" :class="(!clicked ? '' : 'selected-card')">
                <ModuleCard v-if="o || !moduleClick" :class="(darken ? 'darken' : '')"
                    class="module-card module-card3"
                    title="Operations"
                    path="/operations"
                    :lessons="7"
                    color="#58A16D"
                    :percentage="userRef.progressOperations"
                    :show="o"
                    :darken="darken"
                />
            </router-link>
      </div>
    </div>
    <router-view></router-view>
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
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
        self.user = user;
        console.log(self.user.uid);
        firebase.firestore().collection("roles").doc(self.user.uid).get().then((doc) => {
            console.log(doc.data().displayName);
            self.userRef.firstName = doc.data().firstName;
            self.userRef.lastName = doc.data().lastName;
            self.userRef.fullName = (self.userRef.firstName + " " + self.userRef.lastName);
            self.userRef.email = self.user.email;
            self.userRef.totalProgress = doc.data().totalProgress;
            self.userRef.progressAdvisory = doc.data().progressAdvisory;
            self.userRef.progressManagedServices = doc.data().progressManagedServices;
            self.userRef.progressOperations = doc.data().progressOperations;
            self.userRef.companyRole = doc.data().companyRole;
            console.log('ope: ' + self.$route.params.current);
        });
    })
  },
  computed: {
      moduleClick() {
          return store.state.moduleClick;
      }
  },
  methods: {
    handleBack() {
        this.clicked = false;
        store.commit('modulePage');
    },
    toggleModules() {
        //store.commit('toggleModules');
        this.darken = true;
    },
    handleModuleClick(title) {
        this.clicked = true;
        this.toggleModules();

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
    background: #f7f7f7;
    a {
        text-decoration: none !important;
    }
}

.content {
    text-align: center;
}

.module-cards-container {
    //background: red;
    display: flex;
    width: 996px;
}

.module-card {
    opacity: 0;
}

.module-card1 {
    animation: flyup $pageTransitionSpeed ease forwards;
    animation-delay: 0.2s;
}

.module-card2 {
    animation: flyup $pageTransitionSpeed ease forwards;
    //animation-delay: 0.2s;
}

.module-card3 {
    animation: flyup $pageTransitionSpeed ease forwards;
    animation-delay: 0.4s;
}

.selected-card {
    pointer-events: none;
}

.back-button {
    //background: red;
    cursor: pointer;
}

.darken {
    //filter: brightness(0.9);
}
</style>