import {
  getUrl,
  rmaDictionaryAccessoriesTypes,
  rmaDictionaryDamageTypes,
  rmaDictionaryStatusesTypes,
} from "../../../helpers/endpoints";

const state = {
  dictionaries: [
    {
      id: 1,
      name: "accessoriesTypes",
      displayName: "Typy akcesoriów",
      url: rmaDictionaryAccessoriesTypes,
      mutation: "setAccessoriesTypes",
    },
    {
      id: 2,
      name: "damageTypes",
      displayName: "Typy stanu urządzenia",
      url: rmaDictionaryDamageTypes,
      mutation: "setDamageTypes",
    },
    {
      id: 3,
      name: "statusesTypes",
      displayName: "Statusy zgłoszeń",
      url: rmaDictionaryStatusesTypes,
      mutation: "setStatusesTypes",
    },
  ],
  accessoriesTypes: [],
  damageTypes: [],
  statuses: [],
};

const getters = {
  findDictionaryByName: (state) => (name) => {
    if (typeof name !== "string") return false;
    return (
      state.dictionaries.find(
        (d) => d.name.toLowerCase() === name.toLowerCase()
      ) || false
    );
  },
  getStatuses: (state) => state.statuses,
  getAccessoriesTypes: (state) => state.accessoriesTypes,
};

const mutations = {
  setAccessoriesTypes(state, data) {
    state.accessoriesTypes = data;
  },
  setDamageTypes(state, data) {
    state.damageTypes = data;
  },
  setStatusesTypes(state, data) {
    state.statuses = data;
  },
};

const actions = {
  fetchDictionary({ getters, commit }, dictName) {
    const dictionary = getters.findDictionaryByName(dictName);
    if (!dictionary) return console.log("niepoprawna nazwa słownika", dictName);

    fetch(getUrl(dictionary.url))
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          Promise.reject(error);
        }
        commit(dictionary.mutation, resData);
      })
      .catch((err) => console.log(err));
  },
  editDictionary({ getters, dispatch }, { dictType, id, newValue }) {
    const dictionary = getters.findDictionaryByName(dictType);

    if (!dictionary) {
      return console.log("niepoprawna nazwa słownika", dictType);
    }

    let url = getUrl(dictionary.url);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        newValue: newValue,
      }),
    };

    fetch(url, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
      })
      .then(() => {
        dispatch("fetchDictionary", dictionary.name);
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
