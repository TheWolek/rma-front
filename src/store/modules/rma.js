import router from "../../router";

const state = {
  apiState: 0,
  filtersModalActive: false,
  appliedFilter: {
    active: false,
    filters: [],
  },
  tickets: [],
  rmaPage: {},
};

const getters = {
  getActiveFilters(state) {
    return state.appliedFilter.filters;
  },
  getRmaPage(state) {
    return state.rmaPage;
  },
};

const mutations = {
  setApiState(state, newApiState) {
    state.apiState = newApiState;
  },
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
    state.tickets = [];
  },
  setCurrentTickets(state, data) {
    state.tickets = data;
  },
  setRmaPageDetails(state, data) {
    state.rmaPage = data;
    state.apiState = 2;
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
  applyFilters({ commit, dispatch }, data) {
    commit("setFilters", data);
    dispatch("fetchTicketsByFilters");
  },
  fetchTicketsByFilters({ commit, state }) {
    let url = "http://localhost:3000/rma?";
    const filters = state.appliedFilter.filters;
    let q = 0;

    filters.forEach((f) => {
      if (f.name === "zgłoszenie") {
        url += `ticketId=${f.value}`;
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
  getTicketData({ commit, state }, id) {
    commit("setApiState", 1);
    fetch(`http://localhost:3000/rma?ticketId=${id}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404) return console.log("błędny ticketId");
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setRmaPageDetails", resData[0]);
        console.log(resData);
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
