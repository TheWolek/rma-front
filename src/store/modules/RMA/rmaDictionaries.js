import {
  getUrl,
  rmaDictionaryAccesoriesTypes,
  rmaDictionaryDamageTypes,
} from "../../../helpers/endpoints";

const state = {
  accessoriesTypes: [],
  damageTypes: [],
};

const mutations = {
  setAccessoriesTypes(state, data) {
    state.accessoriesTypes = data;
  },
  setDamageTypes(state, data) {
    state.damageTypes = data;
  },
};

const actions = {
  fetchDictionary_AccessoriesTypes({ commit }) {
    fetch(getUrl(rmaDictionaryAccesoriesTypes))
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          Promise.reject(error);
        }
        commit("setAccessoriesTypes", resData);
      })
      .catch((err) => console.log(err));
  },
  fetchDictionary_DamageTypes({ commit }) {
    fetch(getUrl(rmaDictionaryDamageTypes))
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          Promise.reject(error);
        }
        commit("setDamageTypes", resData);
      })
      .catch((err) => console.log(err));
  },
  editDictionary({ dispatch }, { dictType, id, newValue }) {
    let url = "";
    if (dictType === 1) {
      url = getUrl(rmaDictionaryDamageTypes);
    }
    if (dictType === 2) {
      url = getUrl(rmaDictionaryAccesoriesTypes);
    }

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
        if (dictType === 1) {
          dispatch("fetchDictionary_DamageTypes");
        }
        if (dictType === 2) {
          dispatch("fetchDictionary_AccessoriesTypes");
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
