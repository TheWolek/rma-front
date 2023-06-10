import { getUrl, items, shelve } from "../../../helpers/endpoints";

const state = {
  createModal_Active: false,
  findModal_Active: false,
  itemShelveFindModal_Active: false,
  items: [],
  appliedFilter: {
    active: false,
    barcode: null,
    shelve: null,
  },
  activeContextMenu: null,
  shelves: [],
  createModal_externalBarcode: null,
  createModal_externalSn: null,
};

const getters = {
  getCreateModalExternalBarcode(state) {
    return state.createModal_externalBarcode;
  },
  getcreateModalExternalSn(state) {
    return state.createModal_externalSn;
  },
};

const mutations = {
  toggleCreateModal(state) {
    state.createModal_Active = !state.createModal_Active;
  },
  toggleFindModal(state) {
    state.findModal_Active = !state.findModal_Active;
  },
  toggleShelveFindModal(state) {
    state.itemShelveFindModal_Active = !state.itemShelveFindModal_Active;
  },
  clearItems(state) {
    state.items = [];
  },
  addItem(state, itemToAdd) {
    state.items.push(itemToAdd);
  },
  setItems(state, items) {
    state.items = items;
  },
  clearFilter(state) {
    state.appliedFilter = { active: false, barcode: null, shelve: null };
  },
  setFilter(state, newState) {
    state.appliedFilter = newState;
  },
  clearContextMenu(state) {
    state.activeContextMenu = null;
  },
  setContextMenu(state, id) {
    state.activeContextMenu = id;
  },
  setShelves(state, data) {
    state.shelves = data;
  },
  setCreateModal_externalBarcode(state, barcode) {
    state.createModal_externalBarcode = barcode;
  },
  setcreateModal_externalSn(state, sn) {
    state.createModal_externalSn = sn;
  },
};

const actions = {
  submitModal_Create({ commit }, data) {
    commit("clearItems");
    commit("clearFilter");
    commit("setFilter", {
      active: true,
      barcode: data.barcode,
      shelve: null,
    });
    commit("addItem", data);
  },
  submitModal_Find({ commit }, data) {
    commit("clearItems");
    commit("clearFilter");
    commit("setFilter", {
      active: true,
      barcode: data.barcode,
      shelve: null,
    });
    commit("addItem", data);
  },
  submitModal_FindShelve({ commit }, data) {
    commit("clearItems");
    commit("clearFilter");
    commit("setFilter", {
      active: true,
      barcode: null,
      shelve: data.shelve_code,
    });
    commit("setItems", data.data);
  },
  closeContextMenu({ commit }) {
    commit("clearContextMenu");
  },
  setContextMenu({ commit }, id) {
    commit("setContextMenu", id);
  },
  fetchAllShelves({ commit }) {
    fetch(getUrl(shelve))
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setShelves", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteItemFromWarehouse({ commit }, { barcode, shelveId }) {
    //send DELETE request to delete product from warehouse
    //recive {barcode: STR, shelveId: INT}

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        barcode: barcode,
        shelve: shelveId,
      }),
    };
    fetch(getUrl(items), requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
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
