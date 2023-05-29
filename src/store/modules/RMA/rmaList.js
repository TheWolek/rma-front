import { getUrl, rma } from "../../../helpers/endpoints";

const state = {
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
  setCurrentTickets(state, data) {
    state.tickets = data;
  },
  toggleModal_filters(state, newState) {
    state.filtersModalActive = newState;
  },
  setFilters(state, data) {
    state.appliedFilter.filters = data;
    state.appliedFilter.active = true;
  },
  clearAllFilters(state) {
    state.appliedFilter.active = false;
    state.appliedFilter.filters = [];
    state.tickets = [];
  },
};

const actions = {
  applyFilters({ commit, dispatch }, data) {
    commit("setFilters", data);
    dispatch("fetchTicketsByFilters");
  },
  fetchTicketsByFilters({ commit, state }) {
    let url = `${getUrl(rma)}?`;
    const filters = state.appliedFilter.filters;
    let q = 0;

    filters.forEach((f) => {
      if (f.name === "zgłoszenie") {
        url += `ticketId=${f.value}`;
        q++;
      }
      if (f.name === "list") {
        if (q > 0) url += "&";
        url += `waybill=${f.value}`;
        q++;
      }
      if (f.name === "status") {
        if (q > 0) url += "&";
        url += `status=${f.value}`;
        q++;
      }
      if (f.name === "typ") {
        if (q > 0) url += "&";
        url += `type=${f.value}`;
        q++;
      }
      if (f.name === "SN") {
        if (q > 0) url += "&";
        url += `deviceSn=${f.value}`;
        q++;
      }
      if (f.name === "producent") {
        if (q > 0) url += "&";
        url += `deviceProducer=${f.value}`;
      }
    });

    fetch(url)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404) return commit("setCurrentTickets", []);
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setCurrentTickets", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
