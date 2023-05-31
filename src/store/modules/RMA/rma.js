import {
  getUrl,
  rmaDictionaryAccesoriesTypes,
  rmaDictionaryDamageTypes,
  rmaCreate,
} from "../../../helpers/endpoints";

import router from "../../../router";

const state = {
  accessoriesTypes: [],
  damageTypes: [],
  statuses: {},
};

const getters = {};

const mutations = {
  setStatuses(state, data) {
    state.statuses = data;
  },
};

const actions = {
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
          name: "ticket",
          params: { id: resData.ticketId },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
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
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
