const state = {
    createModal_Active: false,
    findModal_Active: false,
    itemShelveFindModal_Active: false,
    items: [],
    appliedFilter: {
        active: false,
        barcode: null,
        shelve: null
    }
}

const mutations = {
    toggleCreateModal(state) {
        state.createModal_Active = !state.createModal_Active
    },
    toggleFindModal(state) {
        state.findModal_Active = !state.findModal_Active
    },
    toggleShelveFindModal(state) {
        state.itemShelveFindModal_Active = !state.itemShelveFindModal_Active
    },
    clearItems(state) {
        state.items = []
    },
    addItem(state, itemToAdd) {
        state.items.push(itemToAdd)
    },
    setItems(state, items) {
        state.items = items
    },
    clearFilter(state) {
        state.appliedFilter = { active: false, barcode: null, shelve: null }
    },
    setFilter(state, newState) {
        state.appliedFilter = newState
    }
}

const actions = {
    submitModal_Create({ commit }, data) {
        console.log(data)
        commit("clearItems")
        commit("clearFilter")
        commit("setFilter", {
            active: true,
            barcode: data.barcode,
            shelve: null
        })
        commit("addItem", data)
    },
    submitModal_Find({ commit }, data) {
        console.log(data)
        commit("clearItems")
        commit("clearFilter")
        commit("setFilter", {
            active: true,
            barcode: data.barcode,
            shelve: null
        })
        commit("addItem", data)
    },
    submitModal_FindShelve({ commit }, data) {
        console.log(data)
        commit("clearItems")
        commit("clearFilter")
        commit("setFilter", {
            active: true,
            barcode: data.barcode,
            shelve: null
        })
        commit("setItems", data.data)
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}