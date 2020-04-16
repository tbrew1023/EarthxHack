<template>
<div class="profile-container">
    <div class="card-top">
        <h4>{{title}}</h4>
        <button class="sign-out" @click="signout">Logout</button>
    </div>
    <div class="card-content">
        <div class="profile-content">
            <div :class="(!dark ? 'profile-photo' : 'profile-photo-dark')"></div>
            <h2>{{user.fullName}}</h2>
            <p>{{user.companyRole}}</p>
            <div class="profile-counters-container">
                <div class="modules-count">
                    
                </div>
                <div class="projects-count">
                    <div class="prof-box prof-box-modules" :class="( dark ? 'prof-box-dark' : '' )">
                        <p class="count-title">
                            <span>Modules Completed</span>
                        </p>
                        <h2 class="count-val">
                            <strong>2</strong>
                        </h2>
                    </div>
                    <div class="prof-box prof-box-projects" :class="( dark ? 'prof-box-dark' : '' )">
                        <p class="count-title">
                            <span>Projects Completed</span>
                        </p>
                        <h2 class="count-val">
                            <strong>8</strong>
                        </h2>
                    </div>
                </div>        
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from '../../store';

export default {
  name: 'Profile',
  props: {
    user: Object,
    title: String,
    signout: Function
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

.profile-container {
    text-align: center;
    padding: $gap;
    //display: flex;

    .card-top {
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
    }
}

h4 {
    line-height: 24px;
    margin: 0px;
}

h2 {
    color: black; 
    //margin-top: 0px;
}

p {
    margin: -6px 0px;
}

.sign-out {
    background: transparent;
    color: black;
    border: black 2px solid;
    padding: 3px 6px 3px 6px;
    transition: 300ms;
    font-weight: bold;

    &:hover {
        background: black;
        color: white;
    }
}

.profile-photo {
    background-image: url("../../assets/profile.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
    cursor: pointer;
    transition: $animationSpeed;
    margin: auto;

    &:hover {
        filter: brightness(0.95);
    }
}

.profile-photo-dark {
    background-image: url("../../assets/profile-dark.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
    cursor: pointer;
    transition: $animationSpeed;
    margin: auto;

    &:hover {
        filter: brightness(0.95);
    }
}

.card-content {
    display: flex;
    margin-top: 42px;
    justify-content: center;
    align-items: center;
}

.projects-count {
    width: 312px;
    height: 124px;
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    /*background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../../assets/counts.svg');*/
    //transform: scale(1.1);

    .prof-box {
        display: flex;
        flex-direction: column;
        background: $colorBackdrop;
        width: 142px;
        height: 124px;
        border-radius: $rad;
    }

    .prof-box-dark {
        display: flex;
        flex-direction: column;
        background: $colorDarkMid;
        width: 142px;
        height: 124px;
        border-radius: $rad;
    }

    .count-title {
        text-align: left;
        font-size: 14px;
        padding-top: 18px;
        padding-left: 18px;
        width: 18px;
        opacity: 0.4;
    }

    .count-val {
        text-align: left;
        padding-left: 18px;
        margin-bottom: 0px;
        margin-top: auto;
        margin-bottom: 18px;
    }
}
</style>