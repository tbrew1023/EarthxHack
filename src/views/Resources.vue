<template>
    <transition name="fade" mode="out-in">
        <div class="page-container">
            <router-link class="resource-link" to="/vendor_data"><div class="card vendor-data"><div class="resource-icon icon-knowledge"></div><h3>SSBO Knowledge Management</h3></div></router-link>
            <router-link class="resource-link" to="/skills_data"><div class="card skills-data"><div class="resource-icon icon-skills"></div><h3>HBR Skills Database</h3></div></router-link>
        </div>
    </transition>
</template>

<script>
export default {
    name: "resources",
    components: {

    },
    data() {
        return {
            showSubcategories: false,
            showVendors: false,
            showEmployees: false,
            category: "",
            subcategory: "",
            vemdor: "",
            subcategories: [],
            vendors: [],
            employees: []
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables';

.card {
    padding: $gap;
    padding-right: 64px;
    background: white;
    border-radius: $rad;
    color: black;
    margin: $gap / 2;
    text-decoration: none !important;
    cursor: pointer;
    display: flex;

    &:hover {
        background: rgba(0,0,0,0.1);
    }
}

h3 {
    margin-top: 24px;
}

.resource-icon {
    //background: red;
    width: 48px;
    height: 48px;
    margin: 12px;
    margin-right: 24px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.icon-skills {
    background-image: url('../assets/icons/people.png');
}

.icon-knowledge {
    background-image: url('../assets/icons/lightbulb.png');
}

.dark {
    .km-list {
        background: $colorDarkLight !important;
        color: white !important;
    }

    .li {
        &:hover {
            background: $colorDarkMid !important;
        }
    }

    .employees {
        background: white !important;
        color: black !important;
    }
}

.resource-link {
    text-decoration: none;
}

.page-container {
    background: $colorBackdrop !important;
}

.cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wd {
    margin-bottom: 48px;
    span {
        //animation: flyup ease forwards 1s;
        margin: 0px;
    }
}

ul {
    list-style: none;
    padding-left: 24px;
}
  
li {
    cursor: pointer;
    margin-top: 24px;

    p {
        width: max-content;
        padding: 3px 12px;
        border-radius: 48px;
        
        &:hover {
            background: #e0e0e0;
        }   
    }
}

.employees {
    background: black !important;
    color: white;

    p {
        &:hover {
            background: transparent !important;
        }
    }
}

span {
    margin-left: 24px;
    margin-right: 24px;
}

.km-list {
    background: white;
    height: 350px;
    width: 350px;
    overflow:auto;
    border-radius: $rad;
    animation: expand forwards ease 1s;
}

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
  background-color: #eeeeee;
  //-webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}

.dark-mode::-webkit-scrollbar-thumb {
  background: gray !important;
  border-radius: 24px;
}
</style>