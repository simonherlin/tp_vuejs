<template>
    <div id="myList">
        <v-toolbar>
            <v-toolbar-title>Shoplist : {{ listOfList[0].text }}</v-toolbar-title>
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
                            v-model="listOfList[0].budget"
                            suffix="€"
                            v-bind:style="bgc"
                            @change="editBudget">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    <!-- <div class="w-25 input-group mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text">Budget</span>
        </div>
        <input v-bind:style="bgc" type="number" class="form-control" v-model="budget" @change="editBudget">
        <div class="input-group-append">
        <span class="input-group-text">€</span>
        </div>
    </div> -->
    <div>
        <div class="input-group mb-3">
            <input v-model="element" type="text" class="w-25" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" @click="addList">Ajouter</button>
            </div>
        </div>
    </div>
    <ul class="list-group w-25">
        <li class="list-group-item" v-for="(item, index) in listOfList[0].list" :key=index style="display: flex;">
            <div class="mr-5 w-25 d-inline-block">
                <input type="checkbox" v-model="item.checked" @change="calTotal"/>
                {{ item.text }}
            </div>
            <div class="input-group w-50 " v-if="item.checked">
            <input type="number" class="form-control" v-model="item.price" @change="calTotal">
            <div class="input-group-append">
                <span class="input-group-text">€</span>
            </div>
            </div>
        <div class="mr-5 w-25 d-inline-block">
            <button type="button" @click="sup(item.id)" class="btn btn-danger">Supprimer</button>
        </div>
        </li>
    </ul>
    <div>
        Total : {{ listOfList[0].total }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyList',
    data:() => ({
      element: '',
      price: 0,
      horsBudget: false,
      bgc: '',
      listOfList: {},
      id: '',
      budget: 0,
      total: 0
    }),
    computed: {
        list: {
            get: function () {
                return this.listOfList[0].list
            },
            set: function (value) {
                this.listOfList[0].list.push({id: this.listOfList[0].list.length, text: value[0], price: value[1], checked: false})
            }
        }
    },
    methods: {
        sup: function(id) {
            let index = this.items.map(function(e) { return e.id; }).indexOf(id);
            if (index > -1) {
                this.items.splice(index, 1);
                this.$parent.calTotal()
            }
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
            if (this.listOfList[this.id].budget > this.listOfList[this.id].total){
                this.bgc = 'border-color:green'
            }else{
                this.bgc = 'border-color:red'
            }
            this.saveBudget()
        },
        saveList: function() {
            const parsed = JSON.stringify(this.listOfList);
            localStorage.setItem('listOfList', parsed);
        },
        saveBudget: function () {
            const parsed = JSON.stringify(this.budget);
            localStorage.setItem('budget', parsed);
        }
    },
    mounted() {
        this.listOfList = JSON.parse(window.localStorage.getItem('listOfList')) || []
        this.id = this.$route.params.id
        debugger
        // this.budget = this.listOfList[this.$route.params.id].budget
        // this.listProduct = this.listOfList[this.$route.params.id].list
        // if (localStorage.getItem('listProduct')) {
        //     try {
        //         this.listProduct = JSON.parse(localStorage.getItem('listProduct'));
        //     } catch(e) {
        //         localStorage.removeItem('listProduct');
        //     }
        // }
        // if (localStorage.getItem('budget')) {
        // try {
        //     this.budget = JSON.parse(localStorage.getItem('budget'));
        //     } catch(e) {
        //     localStorage.removeItem('budget');
        //     } 
        // }
        this.calTotal()
    }
  }
</script>