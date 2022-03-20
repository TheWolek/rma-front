// initial state
const state = () => ({
    modal_active: false,
    form_active: { status: false, active: null, new: null, items: [] }
})

// mutations
const mutations = {
    toggleModal(state) {
        state.modal_active = !state.modal_active
        console.log("modalToggle", state.modal_active)
    },
    toggleFormStatus(state, status) {
        state.form_active = status
        console.log("toggleFormStatus", status)
    },
    setItems(state, newValue) {
        state.form_active.items = newValue
        console.log("setItems", newValue)
    },
    addItem(state, toAdd) {
        state.form_active.items.push(toAdd)
        console.log("addItem", toAdd, state.form_active)
    },
    removeItem(state, toRemove) {
        state.form_active.items.splice(toRemove, 1)
    }
}

export default {
    state,
    mutations
}