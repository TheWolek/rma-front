import {
  getUrl,
  rmaGetAccessories,
  rmaUpdateAccessories,
} from "../../../helpers/endpoints";

const state = {
  accessories: [],
};

const getters = {
  getAccessories(state) {
    return state.accessories;
  },
};

const mutations = {
  setAccessories(state, data) {
    state.accessories = data;
  },
};

const actions = {
  fetchAccessoriesByTicketId({ commit, state }, ticketId) {
    fetch(`${getUrl(rmaGetAccessories)}/${ticketId}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          if (res.status === 404) return commit("setAccessories", []);
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setAccessories", resData);
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
