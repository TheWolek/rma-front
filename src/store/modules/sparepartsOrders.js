const state = {
    createModal_active: false,
    findModal_active: false,
    categories: [],
    statuses: {
        0: { id: 0, "name": "nowy" },
        1: { id: 1, "name": "w realizacji" },
        2: { id: 2, "name": "zakończony" }
    },
    orders: [],
    appliedFilter: {
        active: false,
        partCatId: null,
        status: null,
        expDate: null
    },
}

const mutations = {
    toggleCreateModal(state) {
        state.createModal_active = !state.createModal_active
    },
    toggleFindModal(state) {
        state.findModal_active = !state.findModal_active
    },
    setCategories(state, data) {
        state.categories = data
    },
    clearOrders(state) {
        state.orders = []
    },
    clearFilter(state) {
        state.appliedFilter = {
            active: false,
            partCatId: null,
            status: null,
            expDate: null
        }
    },
    setFilter(state, data) {
        state.appliedFilter = data
    },
    setOrders(state, orders) {
        state.orders = orders
    }
}

const actions = {
    fetchAllCategories({ commit }) {
        fetch("http://localhost:3000/warehouse/spareparts/categories")
            .then(async res => {
                const resData = await res.json()

                if (!res.ok) {
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }

                commit("setCategories", resData)
            })
            .catch(error => {
                console.log(error)
            })
    },
    submitModal_Create({ commit }, data) {
        commit("clearOrders")
        commit("clearFilter")
        // commit("setFilter", {
        //     active: true,
        //     partCatId: null,
        //     status: null,
        //     expDate: null
        // })
        commit("addItem", data)
    },
    submitModal_Find({ commit }, data) {
        console.log(data)
        commit("clearOrders")
        commit("clearFilter")
        commit("setFilter", data.filters)
        commit("setOrders", data.data)
    },
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}