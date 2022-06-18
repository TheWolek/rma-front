const state = {
  parts: {},
  categories: [],
  findModalActive: false,
  refreshingTable: false,
};

const mutations = {
  setParts(state, data) {
    state.parts = data;
  },
  setCategories(state, data) {
    state.categories = data;
  },
  toggleFindModal(state) {
    state.findModalActive = !state.findModalActive;
  },
  toggleRefreshTable(state, newState) {
    state.refreshingTable = newState;
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
  addSpareparts({ commit, state, rootState }, data) {
    let items = [];
    data.forEach((el) => {
      const itemData = rootState.sparepartsOrders.ordersItems.items.find(
        (o) => o.order_item_id == el.item_id
      );
      items.push({
        cat_id: itemData.part_cat_id,
        amount: el.codes.length,
        shelve: 0,
      });
    });

    console.log(items);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    };

    fetch(
      "http://localhost:3000/warehouse/spareparts/add",
      requestOptions
    ).then(async (res) => {
      const resData = await res.json();

      if (!res.ok) {
        const error = (resData && resData.message) || res.status;
        return Promise.reject(error);
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
