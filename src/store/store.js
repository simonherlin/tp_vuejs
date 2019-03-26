import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
    listOfList: [
        {
            id: 0, 
            name: 'Liste soiré', 
            budget: 150, 
            total: 128,
            list: [
                {id: 0, text: 'Bière', price: 64, checked: true},
                {id: 1, text: 'Vodka', price: 34, checked: true},
                {id: 2, text: 'Rhum', price: 20, checked: false},
                {id: 3, text: 'Biscuit apéro', price: 12, checked: true},
                {id: 4, text: 'Coca', price: 8, checked: true},
                {id: 5, text: 'Jus de fruit', price: 12, checked: true}
            ]},
        {
            id: 1, 
            name: 'Course', 
            budget: 40, 
            total: 29, 
            list: [
                {id: 0, text: 'Eau', price: 2, checked: true},
                {id: 1, text: 'Steak', price: 5, checked: true},
                {id: 2, text: 'Poulet', price: 10, checked: true},
                {id: 3, text: 'Pate', price: 6, checked: true},
                {id: 4, text: 'Riz', price: 3, checked: true},
                {id: 5, text: 'Cereale', price: 3, checked: true}
            ]
        }
    ],
    idLast: -1
}

const getters = {
    allList: state => state.listOfList,
    oneList: (state) => (id) => state.listOfList.find(listOfList => listOfList.id === id),
    getLength: (state) => state.listOfList.length,
    getLengthList: (state) => state.idLast,
    shopList: (state) => (id) => state.listOfList.find(listOfList => listOfList.id === id).list,
    getLastId: state => state.idLast
}

const mutations = {
    initialiseStore(state){
        if (localStorage.getItem('store')){
            this.replaceState(
                Object.assign(state, JSON.parse(localStorage.getItem('store')))
            )
        }
    },
    ADD_LIST: (state, list) => {
        state.listOfList.push(list)
        localStorage.setItem('store', JSON.stringify(state));
    },
    ADD_SHOPLIST: (state, id, list) => {
        state.listOfList[id].list.push(list)
        localStorage.setItem('store', JSON.stringify(state));
    },
    UPDATE_LIST: (state, element) => {
        let index = state.listOfList.findIndex(list => list.id === element.id)
        state.listOfList[index] = element
        localStorage.setItem('store', JSON.stringify(state));
    },
    UPDATE_IDLAST: (state, id) => {
        state.idLast = id
    }
}

const actions = {
    addList: (store, list) => {
        store.commit('ADD_LIST', list)
    },
    addShopList: (store, id, list) => {
        store.commit('ADD_SHOPLIST', id, list)
    },
    updateList: (store, list) => {
        store.commit('UPDATE_LIST', list)
    },
    updateIdLast: (store, id) => {
        store.commit('UPDATE_IDLAST', id)
    }
}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
})