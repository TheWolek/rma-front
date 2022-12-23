import router from "../../router";

const state = {
  apiState: 0,
  statuses: {},
  filtersModalActive: false,
  appliedFilter: {
    active: false,
    filters: [],
  },
  tickets: [],
  rmaPage: {},
  waybills: [],
  shipmentModalActive: false,
  editWaybillModalActive: false,
  editWaybillModalData: {},
  addWaybillModalActive: false,
};

const getters = {
  getActiveFilters(state) {
    return state.appliedFilter.filters;
  },
  getRmaPage(state) {
    return state.rmaPage;
  },
  getWaybills(state) {
    return state.waybills;
  },
  getEditWaybillModalData(state) {
    return state.editWaybillModalData;
  },
};

const mutations = {
  setApiState(state, newApiState) {
    state.apiState = newApiState;
  },
  setStatuses(state, data) {
    state.statuses = data;
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
  setWaybills(state, data) {
    state.waybills = data;
  },
  toggleModal_shipment(state, newState) {
    state.shipmentModalActive = newState;
  },
  toggleModal_editWaybill(state, newState) {
    state.editWaybillModalActive = newState;
  },
  setEditWaybillModalData(state, data) {
    state.editWaybillModalData = data;
  },
  toggleModal_addWaybill(state, newState) {
    state.addWaybillModalActive = newState;
  },
};

const actions = {
  fetchAllStatuses({ commit }) {
    commit("setStatuses", [
      { id: 1, displayName: "Nowy" },
      { id: 2, displayName: "Przyjęto w serwisie" },
      { id: 3, displayName: "W realizacji" },
      { id: 4, displayName: "Zlecono kontakt" },
      { id: 5, displayName: "Oczekuje na części" },
      { id: 6, displayName: "Przekazano do odesłania" },
      { id: 7, displayName: "Zakończone" },
      { id: 8, displayName: "Anulowane" },
    ]);
  },
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
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchWaybillsByTicketId({ commit, state }, ticketId) {
    fetch(`http://localhost:3000/rma/waybills?ticketId=${ticketId}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404) return commit("setWaybills", []);
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setWaybills", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  saveWaybillData({ commit, dispatch }, newData) {
    commit("toggleModal_editWaybill", false);
    commit("setEditWaybillModalData", {});

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        waybillNumber: newData.waybillNumber,
        status: newData.status,
        type: newData.type,
      }),
    };

    fetch(`http://localhost:3000/rma/waybills/${newData.id}`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("fetchWaybillsByTicketId", newData.ticketId);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addWaybill({ commit, dispatch }, newData) {
    commit("toggleModal_addWaybill", false);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: newData.ticketId,
        waybillNumber: newData.waybillNumber,
        type: newData.type,
      }),
    };

    fetch(`http://localhost:3000/rma/waybills`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("fetchWaybillsByTicketId", newData.ticketId);
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
