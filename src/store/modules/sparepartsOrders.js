const state = {
    createModal_active: false,
    categories: [],
    orders: []
}

const mutations = {
    toggleCreateModal(state) {
        state.createModal_active = !state.createModal_active
    },
    setCategories(state, data) {
        state.categories = data
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
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}