// initial state
const state = () => ({
    modal_active: false,
    form_active: { status: false, active: null, new: null },
    items: [],
    ableToSubmit: false,
    fail: false,
    notification: { active: false, message: '', mode: null }
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
    },
    toggleFail(state, data) {
        state.fail = data.status
        state.notification.active = true
        state.notification.message = data.msg
        state.notification.mode = 1
    },
    clearMsg(state) {
        state.notification.message = ''
        state.notification.active = false
        state.notification.mode = null
    },
    setMsg(state, data) {
        state.notification.active = true
        state.notification.mode = data.mode
        state.notification.message = data.message
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
    clearData({ commit, state }) {
        commit("toggleFormStatus", { status: false })
        commit("setItems", [])
        commit("toggleAbleToSubmit", false)
        state.fail = false
        commit("clearMsg")
    },
    submitSuccess({ commit, dispatch }, msg) {
        dispatch("clearData")
        commit("setMsg", { message: msg, mode: 0 })
    },
    displayNotifi({ commit, state, dispatch }, data) {
        if (data.mode == 0) { //success
            dispatch("submitSuccess", data.message)
        } else { //fail
            commit("toggleFail", data)
        }

        setTimeout(() => {
            state.notification.active = false
        }, 4000)

        setTimeout(() => {
            state.notification.mode = null
            state.notification.message = ''
        }, 4500)
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}