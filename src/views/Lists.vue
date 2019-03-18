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
                            <v-list-tile v-for="(item, index) in listOfList"
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
                        <v-btn @click="addList" icon>
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
export default {
    name: 'Lists',
    data:() => ({
        search: '',
        add: '',
        listOfList: [
            {id: 0, name: 'test1', budget: 50, total: 25, list: [
                {id: 0, text: 'Bière', price: 8, checked: true},
                {id: 1, text: 'Vodka', price: 17, checked: true},
                {id: 2, text: 'Rhum', price: 0, checked: false}
            ]},
            {id: 1, name: 'test2', budget: 50, total: 0, list: []}
        ],
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
    },
    methods: {
        goto: function(id) {
            this.$router.push('/myList/' + id)
        },
        addList: function() {
            if (this.add !== '') {
                this.listOfList.push(
                {
                    id: this.listOfList.length,
                    name: this.add,
                    budget: 50,
                    total: 0,
                    list: []
                })
                this.add = ''
                this.saveList()
                this.snackbar.text = this.msgValid
                this.snackbar.activate = true
            }
            else {
                this.snackbar.text = this.msgError
                this.snackbar.activate = true
            }
        },
        saveList: function() {
            const parsed = JSON.stringify(this.listOfList);
            localStorage.setItem('listOfList', parsed);
        },
        searchList: function() {

        }
    },
    mounted () {
        this.listOfList = JSON.parse(window.localStorage.getItem('listOfList')) || []
    }
}
</script>
