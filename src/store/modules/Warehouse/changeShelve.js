import { getUrl, itemsChangeShelve, tasks } from "../../../helpers/endpoints";

// initial state
const state = () => ({
  modal_active: false,
  modalData: "",
  form_active: { status: false, active: null, new: null },
  items: [],
  ableToSubmit: false,
  fail: false,
  notification: { active: false, message: "", mode: null },
  taskListActive: false,
  taskList: [],
});

// mutations
const mutations = {
  toggleModal(state, data) {
    state.modal_active = !state.modal_active;
    if (data != "") {
      state.modalData = data;
    }
  },
  toggleFormStatus(state, status) {
    state.form_active = status;
  },
  setItems(state, newValue) {
    state.items = newValue;
  },
  addItem(state, toAdd) {
    state.items.push(toAdd);
  },
  removeItem(state, barcodeToRemove) {
    let indexToRemove = state.items.findIndex(
      (o) => o.barcode == barcodeToRemove
    );
    state.items.splice(indexToRemove, 1);
  },
  toggleAbleToSubmit(state, mode) {
    state.ableToSubmit = mode;
  },
  toggleFail(state, data) {
    state.fail = data.status;
    state.notification.active = true;
    state.notification.message = data.msg;
    state.notification.mode = 1;
  },
  clearMsg(state) {
    state.notification.message = "";
    state.notification.active = false;
    state.notification.mode = null;
  },
  setMsg(state, data) {
    state.notification.active = true;
    state.notification.mode = data.mode;
    state.notification.message = data.message;
  },
  setTaskList(state, tasks) {
    state.taskListActive = true;
    state.taskList = tasks;
  },
};

const actions = {
  addItem({ commit, state }, toAdd) {
    commit("addItem", toAdd);
    if (state.items.length > 0) commit("toggleAbleToSubmit", true);
  },
  removeItem({ commit, state }, barcodeToRemove) {
    commit("removeItem", barcodeToRemove);
    if (state.items.length == 0) commit("toggleAbleToSubmit", false);
  },
  clearData({ commit, state }) {
    commit("toggleFormStatus", { status: false });
    commit("setItems", []);
    commit("toggleAbleToSubmit", false);
    state.fail = false;
    commit("clearMsg");
    state.taskList = [];
    state.taskListActive = false;
  },
  submitSuccess({ commit, dispatch }, msg) {
    dispatch("clearData");
    commit("setMsg", { message: msg, mode: 0 });
  },
  displayNotifi({ commit, state, dispatch }, data) {
    if (data.mode == 0) {
      //success
      dispatch("submitSuccess", data.message);
    } else {
      //fail
      commit("toggleFail", data);
    }

    setTimeout(() => {
      state.notification.active = false;
    }, 4000);

    setTimeout(() => {
      state.notification.mode = null;
      state.notification.message = "";
    }, 4500);
  },
  setDataFromOutside({ commit, dispatch }, data) {
    commit("toggleModal", data.outside_shelve_code);
    dispatch("addItem", {
      barcode: data.outside_barcode,
      ticket_id: data.outside_barcode.split("-")[0],
      model: data.outside_barcode.split("-")[1],
      category: data.outside_barcode.split("-")[2],
    });
  },
  submit({ dispatch }, data) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        barcodes: data.itemsArr,
        new_shelve: data.new,
        shelve: data.active,
      }),
    };

    fetch(getUrl(itemsChangeShelve), requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("displayNotifi", {
          mode: 0,
          status: true,
          message: "Produkty zostały pomyślnie przeniesione",
        });
      })
      .catch((error) => {
        return this.displayError(error);
      });
  },
  setDataFromMoveTask({ commit, dispatch }, data) {
    fetch(`${getUrl(tasks)}/${data.taskName}/tasks`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setTaskList", resData);
        commit("toggleFormStatus", {
          status: true,
          active: data.from,
          new: data.to,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
