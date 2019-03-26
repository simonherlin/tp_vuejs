<template>
    <div id="lists">
        <v-toolbar>
            <v-toolbar-title>Set of Shoplist</v-toolbar-title>
        </v-toolbar>
        <v-form>
            <v-container>
                <v-layout row>
                    <v-flex sm4>
                        <v-text-field
                        v-model="search"
                        label="Search"
                        @change="searchList"
                        ></v-text-field>
                    </v-flex>
                    <v-flex sm2>
                        <v-btn icon>
                            <v-icon>check</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex sm6>
                        <v-list>
                            <v-list-tile v-for="(item, index) in displayList"
                                :key="index"
                                @click="goto(item.id)">
                                    <v-list-tile-content>
                                        <v-list-tile id="item.id">{{ item.name }} </v-list-tile>
                                    </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex sm4>
                        <v-text-field
                        v-model="add"
                        label="new list"
                        ></v-text-field>
                    </v-flex>
                    <v-flex sm2>
                        <v-btn @click="addL" icon>
                            <v-icon>
                                add
                            </v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-snackbar
            v-model="snackbar.activate"
            :bottom="snackbar.y === 'bottom'"
            :left="snackbar.x === 'left'"
            :multi-line="snackbar.mode === 'multi-line'"
            :right="snackbar.x === 'right'"
            :timeout="snackbar.timeout"
            :top="snackbar.y == 'top'"
            :vertical="snackbar.mode === 'vertical'">
                {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script>
import Vuex from 'vuex'

export default {
    name: 'Lists',
    data:() => ({
        search: '',
        add: '',
        displayList: [],
        snackbar: {
            activate: false,
            y: 'top',
            x: null,
            mode: '',
            timeout: 2000,
            text: '' 
        },
        msgError: 'The list has not been added, the name is empty',
        msgValid: 'The list has been added'
    }),
    computed: {
        ...Vuex.mapGetters({
            list: 'allList'
        })
    },
    methods: {
        ...Vuex.mapActions({
            addList: 'addList',
            updateIdLast: 'updateIdLast'
        }),
        addL: function() {
            if (this.add !== '') {
                let newList = {
                    id: this.$store.state.listOfList.length,
                    name: this.add,
                    budget: 50,
                    total: 0,
                    list: []
                }
                this.addList(newList)
                this.add = ''
                this.snackbar.text = this.msgValid
                this.snackbar.activate = true
                this.updateIdLast(this.list.length)
                this.displayList = this.list
                this.searchList()
            }
            else {
                this.snackbar.text = this.msgError
                this.snackbar.activate = true
            }
        },
        goto: function(id) {
            this.$router.push('/myList/' + id)
        },
        searchList: function() {
            this.displayList = []
            let list = this.$store.state.listOfList
            for (let i = 0; i < list.length; i++) {
                if (list[i].name.includes(this.search)) {
                    this.displayList.push(list[i])
                }
            }
        }
    },
    mounted () {
        this.displayList = this.list
    },
    beforeCreate () {
		this.$store.commit('initialiseStore')
	}
}
</script>
