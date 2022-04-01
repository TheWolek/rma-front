const state = {
    createModal_active: false,
    orders: []
}

const mutations = {
    toggleCreateModal(state) {
        state.createModal_active = !state.createModal_active
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}