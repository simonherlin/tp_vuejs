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
            <div>
                Total : {{ total }} €
            </div>
        </v-form>
  </div>
</template>

<script>
import Vuex from 'vuex'

  export default {
    name: 'MyList',
    data:() => ({
      element: '',
      budget: 0,
      horsBudget: false,
      listOfList: [],
      id: '',
      name: '',
      total: 0,
      list: []
    }),
    methods: {
        ...Vuex.mapActions({
            update: 'updateList',
            updateIdLast: 'updateIdLast'
        }),
        sup: function(index) {
            this.list.splice(index, 1)
            this.calTotal()
        },
        addList: function () {
            this.list.push({id:this.list.length, text: this.element, price: 0, checked: false})
            this.element = ''
            this.save()
        },
        calTotal: function() {
            this.total = 0
            for (let i =0; i < this.list.length; i++) {
                if (this.list[i].checked) {
                    this.total += parseInt(this.list[i].price)
                }
            }
            this.editBudget()
        },
        editBudget: function(){
            if (this.budget > this.total){
                this.horsBudget = false
            }else{
                this.horsBudget = true
            }
            this.save()
        },
        save: function (){
            let list = {
                id: parseInt(this.id),
                name: this.name,
                budget: parseInt(this.budget),
                total: this.total,
                list: this.list
            }
            this.update(list)
            this.updateIdLast(this.id)
        }
    },
    mounted() {
        this.id = this.$route.params.id
        this.list = this.$store.state.listOfList[this.id].list
        this.budget = this.$store.state.listOfList[this.id].budget
        this.name = this.$store.state.listOfList[this.id].name
        this.calTotal()
    },
    beforeCreate () {
		this.$store.commit('initialiseStore')
	}
  }
</script>