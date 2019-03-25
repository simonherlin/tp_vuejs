<template>
    <div id="myList">
        <v-toolbar>
            <v-toolbar-title>Shoplist : {{ name }}</v-toolbar-title>
        </v-toolbar>
        <v-form>
            <v-container>
                <v-layout row>
                    <v-flex sm2>
                        <v-subheader>Budget</v-subheader>
                    </v-flex>
                    <v-flex sm4>
                        <v-text-field
                            label="Buget"
                            v-model="budget"
                            suffix="€"
                            @change="editBudget">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm2 v-if="horsBudget">
                        <v-icon color="red">
                            warning
                        </v-icon>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex sm4>
                        <v-text-field
                            label="product name's"
                            v-model="element">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm2>
                        <v-btn icon @click="addList">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex sm6>
                        <v-list>
                            <v-list-tile v-for="(item, index) in list"
                                :key="index">
                                <v-list-tile-action>
                                    <v-checkbox v-model="item.checked" @change="calTotal"></v-checkbox>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    {{ item.text }}
                                </v-list-tile-content>
                                <v-list-tile-action v-if="item.checked">
                                    <v-text-field
                                        type="number"
                                        v-model="item.price"
                                        suffix="€"
                                        @change="calTotal">
                                    </v-text-field>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                    <v-btn icon @click="sup(index)">
                                        <v-icon>
                                            delete
                                        </v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <div>
            Total : {{ listOfList[id].total }} €
        </div>
  </div>
</template>

<script>
import {basicList} from '@/basicList'

  export default {
    name: 'MyList',
    data:() => ({
      element: '',
      budget: 0,
      horsBudget: false,
      listOfList: [],
      id: '',
      name: ''
    }),
    computed: {
        list: {
            get: function () {
                return this.listOfList[this.id].list
            },
            set: function (value) {
                this.listOfList[this.id].list.push(
                    {
                        id: this.listOfList[this.id].list.length,
                        text: value[this.id], price: value[1], checked: false
                    })
            }
        }
    },
    methods: {
        sup: function(index) {
            this.listOfList[this.id].list.splice(index, 1)
            this.calTotal()
        },
        addList: function () {
            this.list.push({id:this.list.length, text: this.element, price: 0, checked: false})
            this.element = ''
            this.saveList()
        },
        calTotal: function() {
            this.listOfList[this.id].total = 0
            for (let i =0; i < this.listOfList[this.id].list.length; i++) {
                if (this.listOfList[this.id].list[i].checked) {
                    this.listOfList[this.id].total += parseInt(this.listOfList[this.id].list[i].price)
                }
            }
            this.editBudget()
            this.saveList()
        },
        editBudget: function(){
            this.listOfList[this.id].budget = this.budget
            if (this.listOfList[this.id].budget > this.listOfList[this.id].total){
                this.horsBudget = false
            }else{
                this.horsBudget = true
            }
            this.saveBudget()
        },
        saveList: function() {
            const parsed = JSON.stringify(this.listOfList);
            localStorage.setItem('listOfList', parsed);
        },
        saveBudget: function () {
            const parsed = JSON.stringify(this.listOfList);
            localStorage.setItem('listOfList', parsed);
        }
    },
    mounted() {
        this.listOfList = JSON.parse(window.localStorage.getItem('listOfList')) || basicList
        this.id = this.$route.params.id
        this.budget = this.listOfList[this.id].budget
        this.name = this.listOfList[this.id].name
        this.calTotal()
    },
    beforeCreate() {
        
    }
  }
</script>