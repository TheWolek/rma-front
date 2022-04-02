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
    appliedFilters: {
        active: false,
        names: {}
    },
    activeContextMenu: false
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
        state.appliedFilters = {
            active: false,
            names: {}
        }
    },
    setFilter(state, data) {
        state.appliedFilters = data
    },
    removeFilter(state, filterToDel) {
        if (filterToDel == "partCatId") return delete state.appliedFilters.names.partCatId
        if (filterToDel == "status") return delete state.appliedFilters.names.status
        if (filterToDel == "expDate") return delete state.appliedFilters.names.expDate
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
        commit("clearOrders")
        commit("clearFilter")
        commit("setFilter", data.filters)
        commit("setOrders", data.data)
    },
    deleteFilter({ commit, dispatch }, filter) {
        commit("removeFilter", filter)
        dispatch("fetchOrdersByFilters")
    },
    fetchOrdersByFilters({ commit, state }) {
        const filters = Object.entries(state.appliedFilters.names)

        if (filters.length === 0) {
            return commit("clearOrders")
        }

        let url = `http://localhost:3000/warehouse/spareparts/orders/?`
        let active = 0

        filters.forEach(el => {
            const [key, value] = el
            if (active > 0) url += "&"
            url += `${key}=${value[1]}`
            active++
        })

        fetch(url)
            .then(async res => {
                const resData = await res.json()
                if (!res.ok) {
                    if (res.status == 404) {
                        commit("setOrders", [])
                        return
                    }
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }
                setTimeout(() => {
                    commit("setOrders", resData)
                }, 500)
            })
            .catch(error => {
                return console.log(error)
            })
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}