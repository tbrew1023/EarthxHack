<template>
    <transition name="fade" mode="out-in">
        <div class="page-container" :class="dark ? 'dark' : ''">
            <div class="cards-container">
                <ul class="categories km-list">
                    <li @click="handleCategoryClick"><p class="category">Organization Experience</p></li>
                    <li @click="handleCategoryClick"><p class="category">Industry Experience</p></li>
                    <li @click="handleCategoryClick"><p class="category">Organizations Consulted For</p></li>
                    <li @click="handleCategoryClick"><p class="category">Industries Consulted For</p></li>
                    <li @click="handleCategoryClick"><p class="category">Skills</p></li>
                    <li @click="handleCategoryClick"><p class="category">Tools/Systems</p></li>
                    <li @click="handleCategoryClick"><p class="category">HBR Project Experience</p></li>
                    <li @click="handleCategoryClick"><p class="category">Certifications</p></li>
                    <li @click="handleCategoryClick"><p class="category">Programming</p></li>
                    <li @click="handleCategoryClick"><p class="category">Languages</p></li>
                    <li @click="handleCategoryClick"><p class="category">Advanced Degrees</p></li>
                </ul>
                <span class="point" v-if="showSubcategories">🡒</span>
                <ul v-if="showSubcategories" class="subcategories km-list km-list-big">
                    <li @click="handleSubcategoryClick" v-for="item in subcategories" :key="item.index"><p>{{ item }}</p></li>
                </ul>
                <span class="point" v-if="showEmployees">🡒</span>
                <ul v-if="showEmployees" class="employees km-list">
                    <li v-for="item in employees" :key="item.index"><p>{{ item }}</p></li>
                </ul>
            </div>
            <div class="wd">
                <h4>
                    <span>Categories</span>
                    <span v-if="showSubcategories"> / Area</span>
                    <span v-if="showEmployees"> / Employees</span>
                </h4>
            </div>
        </div>
    </transition>
</template>

<script>
import firebase from "firebase";
import store from '../store';

export default {
    name: "skills_data",
    data() {
        return {
            showSubcategories: false,
            showAreas: false,
            showEmployees: false,
            category: "",
            subcategory: "",
            area: "",
            subcategories: [],
            areas: [],
            employees: []
        }
    },
    created() {

    },
    computed: {
        dark() {
            return store.state.dark;
        }
    },
    methods: {
        handleCategoryClick(e) {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
            this.showSubcategories = true;
            this.showEmployees = false;
            var self = this;
            firebase
            .firestore()
            .collection("HBR_skills_library_v5")
            .where("category", "==", e.target.innerHTML.replace("&amp;", "&"))
            .get().then(function(docs) {
                let rawDoc = [];
                docs.forEach(doc => {
                    rawDoc.push(doc.data());
                })
                //unique subcategories for p]arent category
                self.subcategories = [...new Set(rawDoc.map(x => x.area))];
                //console.log(self.subcategories);
            }).catch(function(error) {
                console.log('Error getting documents: ', error);
            });
        },
        handleSubcategoryClick(e) {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
            this.showEmployees = true;
            var self = this;
            firebase
            .firestore()
            .collection("HBR_skills_library_v5")
            .where("area", "==", e.target.innerHTML.replace("&amp;", "&"))
            .get().then(function(docs) {
                let rawDoc = [];
                docs.forEach(doc => {
                    rawDoc.push(doc.data());
                })
                //unique subcategories for parent category
                self.employees = [...new Set(rawDoc.map(x => x.employee))];
                console.log(self.areas);
            }).catch(function(error) {
                console.log('Error getting documents: ', error);
            });
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables';

.point {
    font-size: 24px;
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

.page-container {
    background: $colorBackdrop;
    flex-direction: column;
}

.cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wd {
    margin-top: 64px;
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

.km-list-big {
    animation: expand2 forwards ease 1s;
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