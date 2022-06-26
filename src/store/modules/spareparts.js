const state = {
  parts: {},
  categories: [],
  findModalActive: false,
  refreshingTable: false,
  appliedFilters: {
    active: false,
    names: {},
  },
  activePartDetails: {},
  partDetailsPageActive: false,
  fetchingPartDetails: false,
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
  clearParts(state) {
    state.parts = {};
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
    if (filterToDel === "category")
      return delete state.appliedFilters.names.category;
    if (filterToDel === "producer")
      return delete state.appliedFilters.names.producer;
    if (filterToDel === "name") return delete state.appliedFilters.names.name;
  },
  setActivePartDetails(state, data) {
    state.activePartDetails = data[Object.keys(data)[0]];
  },
  clearActivePartDetails(state) {
    state.activePartDetails = {};
  },
  togglePartDetailsPageActive(state, newState) {
    state.partDetailsPageActive = newState;
  },
  toggleFetchingPartDetails(state, newState) {
    state.fetchingPartDetails = newState;
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
  addSpareparts({ commit, state, dispatch, rootState }) {
    let items = [];

    rootState.sparepartsOrders.ordersItems.items.forEach((el) => {
      items.push({
        cat_id: el.part_cat_id,
        amount: el.codes.length,
        shelve: 0,
      });
    });

    // data.forEach((el) => {
    //   const itemData = rootState.sparepartsOrders.ordersItems.items.find(
    //     (o) => o.order_item_id == el.item_id
    //   );
    //   items.push({
    //     cat_id: itemData.part_cat_id,
    //     amount: el.codes.length,
    //     shelve: 0,
    //   });
    // });

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

      console.log(resData);
      dispatch("sparepartsOrders/sendItemsSn", resData.inertedRows, {
        root: true,
      });
    });
  },
  submitModal_Find({ commit }, data) {
    commit("clearParts");
    commit("clearFilter");
    commit("setFilter", data.filters);
    commit("setParts", data.data);
  },
  deleteFilter({ commit, dispatch }, toDel) {
    commit("removeFilter", toDel);
    dispatch("fetchPartsByFilters");
  },
  fetchPartsByFilters({ commit, state }) {
    commit("toggleRefreshTable", true);
    const filters = Object.entries(state.appliedFilters.names);

    if (filters.length === 0) {
      commit("clearParts");
      commit("toggleRefreshTable", false);
      return;
    }

    let url = `http://localhost:3000/warehouse/spareparts?`;
    let active = 0;

    filters.forEach((el) => {
      const [key, value] = el;
      if (active > 0) url += "&";
      url += `${key}=${value}`;
      active++;
    });

    fetch(url)
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          if (res.status == 404) {
            commit("setParts", []);
            commit("toggleRefreshTable", false);
            return;
          }
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
        setTimeout(() => {
          commit("setParts", resData);
          commit("toggleRefreshTable", false);
        }, 500);
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  fetchActivePartDetails({ commit }, id) {
    console.log(id);
    fetch(`http://localhost:3000/warehouse/spareparts?cat_id=${id}`)
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          if (res.status == 404) {
            commit("clearActivePartDetails");
            // commit("toggleRefreshTable", false);
            return;
          }
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
        // setTimeout(() => {
        //   commit("setParts", resData);
        //   commit("toggleRefreshTable", false);
        // }, 500);
        commit("setActivePartDetails", resData);
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  openPartDetails({ state, commit, dispatch }, id) {
    console.log(id);
    commit("toggleFetchingPartDetails", true);
    dispatch("fetchActivePartDetails", id);
    dispatch("items/fetchAllShelves", null, { root: true });
    setTimeout(() => {
      commit("togglePartDetailsPageActive", true);
      commit("toggleFetchingPartDetails", false);
    }, 400);
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
