import store from ".."

// initial state
const state = () => ({
    modal_active: false,
    form_active: { status: false, active: null, new: null },
    items: [],
    ableToSubmit: false
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
        state.items = newValue
        console.log("setItems", newValue)
    },
    addItem(state, toAdd) {
        state.items.push(toAdd)
        console.log("addItem", state.items)
    },
    removeItem(state, barcodeToRemove) {
        let indexToRemove = state.items.findIndex(o => o.barcode == barcodeToRemove)
        state.items.splice(indexToRemove, 1)
    },
    toggleAbleToSubmit(state, mode) {
        state.ableToSubmit = mode
    }
}

const actions = {
    addItem({ commit, state }, toAdd) {
        commit("addItem", toAdd)
        if (state.items.length > 0) commit("toggleAbleToSubmit", true)
    },
    removeItem({ commit, state }, barcodeToRemove) {
        commit("removeItem", barcodeToRemove)
        if (state.items.length == 0) commit("toggleAbleToSubmit", false)
    },
    clearData(context) {
        context.commit("toggleFormStatus", { status: false })
        context.commit("setItems", [])
        context.commit("toggleAbleToSubmit", false)
    }
}

export default {
    state,
    mutations,
    actions
}