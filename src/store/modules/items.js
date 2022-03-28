const state = {
    createModal_Active: false,
    findModal_Active: false,
    itemShelveFindModal_Active: false,
    items: []
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
    }
}

const actions = {
    submitModal_Create({ commit }, data) {
        console.log(data)
        commit("clearItems")
        commit("addItem", data)
    },
    submitModal_Find({ commit }, data) {
        console.log(data)
        commit("clearItems")
        commit("addItem", data)
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}