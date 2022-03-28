const state = {
    createModal_Active: false,
    findModal_Active: false,
    itemShelveFindModal_Active: false
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
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}