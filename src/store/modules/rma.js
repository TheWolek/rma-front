import router from "../../router";

const state = {
  rmaPageActive: false,
  filtersModalActive: false,
  appliedFilter: {
    active: false,
    filters: [],
  },
  tickets: [],
};

const getters = {
  getActiveFilters(state) {
    return state.appliedFilter.filters;
  },
};

const mutations = {
  setFilters(state, data) {
    state.appliedFilter.filters = data;
    state.appliedFilter.active = true;
  },
  toggleModal_filters(state, newState) {
    state.filtersModalActive = newState;
  },
  clearAllFilters(state) {
    state.appliedFilter.active = false;
    state.appliedFilter.filters = [];
  },
};

const actions = {
  submitNewTicket({ commit, state }, data) {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/rma/create", requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        console.log(resData);
        router.push({
          path: "items",
          query: { ticketId: resData.ticketId },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  applyFilters({ commit, state }, data) {
    commit("setFilters", data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
