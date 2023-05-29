import { getUrl, rmaWaybills } from "../../../helpers/endpoints";

const state = {
  waybills: [],
  editWaybillModalActive: false,
  editWaybillModalData: {},
  addWaybillModalActive: false,
};

const getters = {
  getWaybills(state) {
    return state.waybills;
  },
  getEditWaybillModalData(state) {
    return state.editWaybillModalData;
  },
};

const mutations = {
  setWaybills(state, data) {
    state.waybills = data;
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
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
