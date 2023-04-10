import router from "../../router";

import {
  getUrl,
  rma,
  rmaCreate,
  rmaWaybills,
  rmaRegister,
  rmaChangeState,
  rmaComments,
  rmaComment,
  rmaSpareparts,
  rmaSparepartsUse,
} from "../../helpers/endpoints";

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
  statusModalActive: false,
  processModalActive: false,
  comments: [],
  parts: [],
  partError: "",
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
  getComments(state) {
    return state.comments;
  },
  getParts(state) {
    return state.parts;
  },
  getTicketId(state) {
    return state.rmaPage.ticket_id;
  },
  getPartError(state) {
    return state.partError;
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
  toggleModal_status(state, newState) {
    state.statusModalActive = newState;
  },
  toggleModal_process(state, newState) {
    state.processModalActive = newState;
  },
  setComments(state, data) {
    state.comments = data;
  },
  setParts(state, data) {
    state.parts = data;
  },
  setPartError(state, msg) {
    state.partError = msg;
  },
};

const actions = {
  fetchAllStatuses({ commit }) {
    commit("setStatuses", [
      { id: 1, displayName: "Nowy" },
      { id: 2, displayName: "Przyjęto w serwisie" },
      { id: 3, displayName: "Przekazano do diagnozy" },
      { id: 4, displayName: "W realizacji" },
      { id: 5, displayName: "Zlecono kontakt" },
      { id: 6, displayName: "Oczekuje na części" },
      { id: 7, displayName: "Przekazano do odesłania" },
      { id: 8, displayName: "Zakończone" },
      { id: 9, displayName: "Anulowane" },
    ]);
  },
  submitNewTicket({ commit, state }, data) {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(getUrl(rmaCreate), requestOptions)
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
  getTicketData({ commit, state }, id) {
    commit("setApiState", 1);
    fetch(`${getUrl(rma)}?ticketId=${id}`)
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
    fetch(`${getUrl(rmaWaybills)}?ticketId=${ticketId}`)
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

    fetch(`${getUrl(rmaWaybills)}/${newData.id}`, requestOptions)
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

    fetch(getUrl(rmaWaybills), requestOptions)
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
  registerDeviceInWarehouse({ commit, dispatch }, ticketId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${getUrl(rmaRegister)}/${ticketId}`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("getTicketData", ticketId);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  changeTicketStatus({ commit, dispatch, getters }, data) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: data.newStatus,
      }),
    };
    fetch(`${getUrl(rmaChangeState)}/${data.ticketId}`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("toggleModal_status", false);
        dispatch("getTicketData", data.ticketId);

        if (data.newStatus === 2) {
          const rmaPage = getters.getRmaPage;
          let barcode = `${rmaPage.ticket_id}-${rmaPage.device_producer}-${rmaPage.device_cat}`;
          commit("items/setCreateModal_externalBarcode", barcode, {
            root: true,
          });
          commit("items/setcreateModal_externalSn", rmaPage.device_sn, {
            root: true,
          });
          commit("items/toggleCreateModal", null, { root: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchCommentsByTicketId({ commit }, ticketId) {
    fetch(`${getUrl(rmaComments)}/${ticketId}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404) return commit("setComments", []);
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setComments", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addCommentToTicket({ dispatch }, data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: data.comment,
      }),
    };
    fetch(`${getUrl(rmaComment)}/${data.ticketId}`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("fetchCommentsByTicketId", data.ticketId);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  toggleModal_process({ state, commit, dispatch }, newState) {
    dispatch("fetchCommentsByTicketId", state.rmaPage.ticket_id);
    dispatch("fetchPartsByTicketId", state.rmaPage.ticket_id);
    commit("toggleModal_process", newState);
  },
  fetchPartsByTicketId({ commit }, ticketId) {
    fetch(`${getUrl(rmaSpareparts)}/${ticketId}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404) return commit("setParts", []);
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setParts", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addPartToTicket({ commit, dispatch }, data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: data.sn,
      }),
    };
    fetch(`${getUrl(rmaSpareparts)}/${data.ticketId}`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404)
            return commit("setPartError", resData.message);
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sn: data.sn,
          }),
        };

        fetch(getUrl(rmaSparepartsUse), requestOptions)
          .then(async (res) => {
            const resData = await res.json();

            if (!res.ok) {
              if (res.status === 404)
                return commit("setPartError", resData.message);
              const error = (resData && resData.message) || res.status;
              return Promise.reject(error);
            }

            dispatch("fetchPartsByTicketId", data.ticketId);
          })
          .catch((e) => console.log(e));
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
