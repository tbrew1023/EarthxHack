<template>
    <transition name="fade" mode="out-in">
        <div class="page-container" :class="dark ? 'dark' : ''">
            <div class="cards-container">
                <ul class="categories km-list">
                    <li @click="handleCategoryClick"><p class="category">Managed Document Solutions</p></li>
                    <li @click="handleCategoryClick"><p class="category">Courier & Messenger Services</p></li>
                    <li @click="handleCategoryClick"><p class="category">Executive Search & Staffing Services</p></li>
                    <li @click="handleCategoryClick"><p class="category">Insurance & Benefits</p></li>
                    <li @click="handleCategoryClick"><p class="category">IT Hardware & Software</p></li>
                    <li @click="handleCategoryClick"><p class="category">IT Services & Miscellaneous</p></li>
                    <li @click="handleCategoryClick"><p class="category">Managed Document Solutions</p></li>
                    <li @click="handleCategoryClick"><p class="category">Office Related Products</p></li>
                    <li @click="handleCategoryClick"><p class="category">Professional Services</p></li>
                    <li @click="handleCategoryClick"><p class="category">Real Estate & Occupancy</p></li>
                    <li @click="handleCategoryClick"><p class="category">Records Management</p></li>
                    <li @click="handleCategoryClick"><p class="category">Research & Information Solutions</p></li>
                    <li @click="handleCategoryClick"><p class="category">Telecom & Network Related</p></li>
                    <li @click="handleCategoryClick"><p class="category">Travel, Food & Entertainment</p></li>
                    <li @click="handleCategoryClick"><p class="category">Vendor Governance General Knowledge</p></li>
                </ul>
                <span class="point" v-if="showSubcategories">🡒</span>
                <ul v-if="showSubcategories" class="subcategories km-list">
                    <li @click="handleSubcategoryClick" v-for="item in subcategories" :key="item.index"><p>{{ item }}</p></li>
                </ul>
                <span class="point" v-if="showAreas">🡒</span>
                <ul v-if="showAreas" class="areas km-list">
                    <li @click="handleAreaClick" v-for="item in areas" :key="item.index"><p>{{ item }}</p></li>
                </ul>
                <span class="point" v-if="showEmployees">🡒</span>
                <ul v-if="showEmployees" class="employees km-list">
                    <li v-for="item in employees" :key="item.index"><p>{{ item.employeeName }}<span class="designation" :class="styleRank(item.designation)">{{ item.designation }}</span></p></li>
                </ul>
            </div>
            <div class="wd">
                <h4>
                    <span>Categories</span>
                    <span v-if="showSubcategories"> / Subcategories</span>
                    <span v-if="showAreas"> / Area</span>
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
    name: "vendor_data",
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
            employees: [],
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
            .collection("knowledge_management")
            .where("category", "==", e.target.innerHTML.replace("&amp;", "&"))
            .get().then(function(docs) {
                let rawDoc = [];
                docs.forEach(doc => {
                    rawDoc.push(doc.data());
                })
                //unique subcategories for p]arent category
                self.subcategories = [...new Set(rawDoc.map(x => x.subcategory))];
                //console.log(self.subcategories);
            }).catch(function(error) {
                console.log('Error getting documents: ', error);
            });
        },
        handleSubcategoryClick(e) {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
            this.showAreas = true;
            var self = this;
            firebase
            .firestore()
            .collection("knowledge_management")
            .where("subcategory", "==", e.target.innerHTML.replace("&amp;", "&"))
            .get().then(function(docs) {
                let rawDoc = [];
                docs.forEach(doc => {
                    rawDoc.push(doc.data());
                })
                //unique subcategories for parent category
                self.areas = [...new Set(rawDoc.map(x => x.area))];
                console.log(self.areas);
            }).catch(function(error) {
                console.log('Error getting documents: ', error);
            });
        },
        handleAreaClick(e) {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
            this.showEmployees = true;
            var self = this;
            firebase
                .firestore()
                .collection("knowledge_management")
                .where("area", "==", e.target.innerHTML.replace("&amp;", "&"))
                .orderBy("designation", "desc")
                .get().then(function(docs) {
                    let rawDoc = [];
                    docs.forEach(doc => {
                        rawDoc.push(doc.data());
                    })
                    //unique subcategories for parent category
                    let filtered = [...new Set(rawDoc.filter(x => x.designation >= 1))];
                    console.log(filtered);
                    filtered.forEach((employee) => {
                        self.employees.push(employee);
                    });

                    console.log(self.designation);
            }).catch(function(error) {
                console.log('Error getting documents: ', error);
            });
        },
        styleRank(target) {
            if(target == 1) {
                return 'rank1';
            }
            else if(target == 2) {
                return 'rank2';
            }
            else { //target == 3
                return 'rank3';
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/global-styles/variables';

.point {
    font-size: 24px;
}

.designation {
    //background: red;
    padding: 2px 8px 2px 8px;
    border-radius: 12px;
}

.rank1 {
    background: $colorBlue;
    opacity: 0.5;
}

.rank2 {
    background: $colorBlue;
}

.rank3 {
    background: $colorGreen;
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
    //box-shadow: $softerShadow;
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