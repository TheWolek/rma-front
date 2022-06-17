const state = {};

const mutations = {};

const actions = {
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
