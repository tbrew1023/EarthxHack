<template>
  <div class="page-container">
    <div class="content">
        <div class="module-cards-container">
        <ModuleCard
            class="module-card module-card2"
            title="Managed Services"
            :lessons="6"
            color="#386C81"
            :percentage="userRef.progressManagedServices"
         />
        <ModuleCard
            class="module-card module-card1"
            title="Advisory"
            :lessons="16"
            color="#7EB0AF"
            :percentage="userRef.progressAdvisory"
         />
        <ModuleCard
            class="module-card module-card3"
            title="Operations"
            :lessons="7"
            color="#58A16D"
            :percentage="userRef.progressOperations"
         />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import ModuleCard from '@/components/user_dash/ModuleCard';

export default {
  name: 'AllModules',
  components: {
      ModuleCard
  },
  data() {
      return {
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
        });
    })
  }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables.scss';

.page-container {
    //background: #eee;
}

.content {
    text-align: center;
}

.module-cards-container {
    //background: red;
    display: flex;
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
</style>