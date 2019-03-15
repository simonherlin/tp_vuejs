<template>
    <div>
        <div class="input-group mb-3">
            <input v-model="search" type="text" class="w-25" >
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" @click="searchList"><i class="material-icons">search</i></button>
            </div>
        </div>
        <table class="w-25 table table-striped">
            <tbody>
                <tr v-for="item in listOfList" :key=item.id>
                    <router-link to="/myList/item.id">{{ item.name }}</router-link>
                </tr>
            </tbody>
        </table>
        <div class="input-group mb-3">
            <input v-model="add" type="text" class="w-25" >
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" @click="addList"><i class="material-icons">check</i></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Lists',
    data:() => ({
        listOfList: [
            {id: 0, name: 'test1', budget: 50, total: 25, list: [
                {id: 0, text: 'Bière', price: 8, checked: true},
                {id: 1, text: 'Vodka', price: 17, checked: true},
                {id: 2, text: 'Rhum', price: 0, checked: false}
            ]},
            {id: 1, name: 'test2', budget: 50, total: 0, list: []}
        ],
        search: '',
        add: ''
    }),
    computed: {
    },
    methods: {
        addList: function() {
            if (this.add !== '') {
                this.listOfList.push(
                {
                    id: this.listOfList.length,
                    text: this.add,
                    budegt: 50,
                    total: 0,
                    list: []
                })
                this.add = ''
                this.saveList()
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
