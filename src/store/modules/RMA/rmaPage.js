import {
  getUrl,
  rma,
  rmaChangeState,
  rmaComments,
  rmaComment,
  rmaSpareparts,
  SparepartsUse,
  rmaRegister,
} from "../../../helpers/endpoints";

const state = {
  apiState: 0,
  rmaPage: {},
  statusModalActive: false,
  shipmentModalActive: false,
  processModalActive: false,
  rmaPageEditMode: false,
  comments: [],
  parts: [],
  partError: "",
};

const getters = {
  getRmaPage(state) {
    return state.rmaPage;
  },
  getTicketId(state) {
    return state.rmaPage.ticket_id;
  },
  getRmaPageEditMode(state) {
    return state.rmaPageEditMode;
  },
  getComments(state) {
    return state.comments;
  },
  getParts(state) {
    return state.parts;
  },
  getPartError(state) {
    return state.partError;
  },
};

const mutations = {
  setApiState(state, newApiState) {
    state.apiState = newApiState;
  },
  setRmaPageDetails(state, data) {
    state.rmaPage = data;
    state.apiState = 2;
  },
  toggleModal_status(state, newState) {
    state.statusModalActive = newState;
  },
  toggleModal_shipment(state, newState) {
    state.shipmentModalActive = newState;
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
  setRmaPageEditMode(state, newState) {
    state.rmaPageEditMode = newState;
  },
};

const actions = {
  toggleModal_process({ state, commit, dispatch }, newState) {
    dispatch("fetchCommentsByTicketId", state.rmaPage.ticket_id);
    dispatch("fetchPartsByTicketId", state.rmaPage.ticket_id);
    commit("toggleModal_process", newState);
  },
  getTicketData({ commit }, id) {
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

        fetch(getUrl(SparepartsUse), requestOptions)
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
