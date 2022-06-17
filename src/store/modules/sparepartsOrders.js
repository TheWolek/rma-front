const state = {
  createModal_active: false,
  findModal_active: false,
  editModal_active: false,
  editSNModal_active: false,
  categories: [],
  suppliers: [],
  // statuses: {
  //   0: { id: 0, name: "nowy" },
  //   1: { id: 1, name: "w realizacji" },
  //   2: { id: 2, name: "zakończony" },
  // },
  statuses: [],
  orders: [],
  ordersItems: {
    orderData: {},
    items: [],
  },
  appliedFilters: {
    active: false,
    names: {},
  },
  activeContextMenu: false,
  refreshingTable: false,
  editModal_outsideData: {},
  editOrderMode: false,
  activeNewRow: false,
  orderItemsChecked: [],
};

const mutations = {
  toggleCreateModal(state) {
    state.createModal_active = !state.createModal_active;
  },
  toggleFindModal(state) {
    state.findModal_active = !state.findModal_active;
  },
  toggleEditModal(state) {
    state.editModal_active = !state.editModal_active;
  },
  toggleEditSNModal(state) {
    state.editSNModal_active = !state.editSNModal_active;
  },
  setCategories(state, data) {
    state.categories = data;
  },
  setSuppliers(state, data) {
    state.suppliers = data;
  },
  setStatuses(state, data) {
    state.statuses = data;
  },
  clearOrders(state) {
    state.orders = [];
  },
  clearFilter(state) {
    state.appliedFilters = {
      active: false,
      names: {},
    };
  },
  setFilter(state, data) {
    state.appliedFilters = data;
  },
  removeFilter(state, filterToDel) {
    if (filterToDel == "partCatId")
      return delete state.appliedFilters.names.partCatId;
    if (filterToDel == "status")
      return delete state.appliedFilters.names.status;
    if (filterToDel == "expDate")
      return delete state.appliedFilters.names.expDate;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
  updateOrderStatus(state, { order_id, newStatus }) {
    const index = state.orders.findIndex((o) => o.part_order_id == order_id);
    state.orders[index].status = newStatus;
  },
  syncOrderData(state) {
    const index = state.orders.findIndex(
      (o) => o.part_order_id === state.ordersItems.orderData.part_order_id
    );
    state.ordersItems.orderData = state.orders[index];
  },
  toggleRefreshTable(state, mode) {
    state.refreshingTable = mode;
  },
  clearContextMenu(state) {
    state.activeContextMenu = null;
  },
  setContextMenu(state, id) {
    state.activeContextMenu = id;
  },
  setEditModalOutsideData(state, data) {
    state.editModal_outsideData = data;
  },
  clearEditModalOutsideData(state) {
    state.editModal_outsideData = {};
  },
  toggleEditOrderMode(state) {
    state.editOrderMode = !state.editOrderMode;
  },
  clearOrdersItems(state) {
    state.ordersItems = {
      orderData: {},
      items: [],
    };
  },
  setOrdersItems(state, data) {
    state.ordersItems = data;
  },
  setOrdersItemsOrderData(state, data) {
    state.ordersItems.orderData = data;
  },
  addOrdersItems(state, toAdd) {
    state.ordersItems.items.push(toAdd);
  },
  removeOrderItems(state, toDel) {
    const obj = state.ordersItems.items.find((o) => o.order_item_id == toDel);
    obj.toRemove = true;
    state.orderItemsChecked = [];
  },
  toggleActiveNewRow(state, data) {
    if (data === undefined) {
      state.activeNewRow = !state.activeNewRow;
    } else {
      state.activeNewRow = data;
    }
  },
  toggleOrdersItemsChecked(state, data) {
    const index = state.orderItemsChecked.indexOf(data);
    if (index > -1) {
      state.orderItemsChecked.splice(index, 1);
    } else {
      state.orderItemsChecked.push(data);
    }
  },
  addSnToPart(state, data) {
    state.ordersItems.items[data.index].codes.push(data.code);
  },
  clearPartsSn(state) {
    state.ordersItems.items.forEach((el) => {
      el.codes = [];
    });
  },
};

const actions = {
  fetchAllCategories({ commit }) {
    fetch("http://localhost:3000/warehouse/spareparts/categories")
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setCategories", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchAllSuppliers({ commit }) {
    fetch("http://localhost:3000/warehouse/spareparts/suppliers")
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setSuppliers", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchAllStatuses({ commit }) {
    fetch("http://localhost:3000/warehouse/spareparts/statuses")
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setStatuses", resData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  submitModal_Create({ commit }, data) {
    commit("clearOrders");
    commit("clearFilter");
    // commit("setFilter", {
    //     active: true,
    //     partCatId: null,
    //     status: null,
    //     expDate: null
    // })
    commit("setOrders", [data]);
  },
  submitModal_Edit({ commit }, data) {
    //commit("clearOrders");
    //commit("clearFilter");
    // commit("setOrders", [data]);
    commit("updateOrderStatus", data);
    commit("syncOrderData");
    //commit("setOrdersItemsOrderData", data);
  },
  submitModal_Find({ commit }, data) {
    commit("clearOrders");
    commit("clearFilter");
    commit("setFilter", data.filters);
    commit("setOrders", data.data);
  },
  deleteFilter({ commit, dispatch }, filter) {
    commit("removeFilter", filter);
    dispatch("fetchOrdersByFilters");
  },
  fetchOrdersByFilters({ commit, state }) {
    commit("toggleRefreshTable", true);
    const filters = Object.entries(state.appliedFilters.names);

    if (filters.length === 0) {
      commit("clearOrders");
      commit("toggleRefreshTable", false);
      return;
    }

    let url = `http://localhost:3000/warehouse/spareparts/orders/find?`;
    let active = 0;

    filters.forEach((el) => {
      const [key, value] = el;
      if (active > 0) url += "&";
      url += `${key}=${value[1]}`;
      active++;
    });

    fetch(url)
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          if (res.status == 404) {
            commit("setOrders", []);
            commit("toggleRefreshTable", false);
            return;
          }
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
        setTimeout(() => {
          commit("setOrders", resData);
          commit("toggleRefreshTable", false);
        }, 500);
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  closeContextMenu({ commit }) {
    commit("clearContextMenu");
  },
  setContextMenu({ commit }, id) {
    commit("setContextMenu", id);
  },
  toggleEditModal({ commit, state }, data) {
    if (state.editModal_active) {
      commit("toggleEditModal");
      commit("clearEditModalOutsideData");
      return;
    } else {
      commit("setEditModalOutsideData", data);
      commit("toggleEditModal");
    }
  },
  toggleEditOrder({ commit, state }, data) {
    console.log("EditOrder", data);
    fetch(
      `http://localhost:3000/warehouse/spareparts/orders/items?order_id=${data.part_order_id}`
    )
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          if (res.status == 404) {
            commit("clearOrdersItems");
            // commit("toggleRefreshTable", false)
            return;
          }
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
        setTimeout(() => {
          commit("setOrdersItems", {
            orderData: { ...data },
            items: resData,
          });
          // commit("toggleRefreshTable", false)
          if (data.open) commit("toggleEditOrderMode");
        }, 500);
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  addOrderItem({ commit }, data) {
    let item = {
      order_item_id: null,
      amount: data.amount,
      part_cat_id: data.part_cat_id,
    };

    commit("addOrdersItems", item);
  },
  removeOrderItems({ commit }, data) {
    data.toDel.forEach((el) => {
      commit("removeOrderItems", el);
    });
  },
  reciveOrder({ commit }, data) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(
      "http://localhost:3000/warehouse/spareparts/orders",
      requestOptions
    ).then(async (res) => {
      const resData = await res.json();

      if (!res.ok) {
        const error = (resData && resData.message) || res.status;
        return Promise.reject(error);
      }

      commit("updateOrderStatus", {
        order_id: data.order_id,
        newStatus: data.newStatus,
      });
    });
  },
  async sendItemsSn({ commit, state, dispatch }) {
    let itemsToUpdate = [];
    state.ordersItems.items.forEach((el) => {
      itemsToUpdate.push({ item_id: el.order_item_id, codes: el.codes });
    });
    console.log(itemsToUpdate);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemsToUpdate),
    };

    await fetch(
      "http://localhost:3000/warehouse/spareparts/orders/items/codes",
      requestOptions
    ).then(async (res) => {
      const resData = await res.json();

      if (!res.ok) {
        const error = (resData && resData.message) || res.status;
        return Promise.reject(error);
      }

      console.log("updated");
      commit("toggleEditSNModal");
    });

    await dispatch("spareparts/addSpareparts", itemsToUpdate, { root: true });

    await console.log("items added");
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
