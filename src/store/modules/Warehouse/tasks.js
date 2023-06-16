import { getUrl, tasks } from "@/helpers/endpoints";

const state = {
  apiState: 0,
  tasksList: [],
};

const getters = {
  getApiState(state) {
    return state.apiState;
  },
  getTasksList(state) {
    return state.tasksList;
  },
};

const mutations = {
  setApiState(state, newApiState) {
    state.apiState = newApiState;
  },
  setTasksList(state, newList) {
    state.tasksList = newList;
    state.apiState = 2;
  },
};

const actions = {
  fetchTasksList({ commit }, type) {
    commit("setApiState", 1);
    fetch(`${getUrl(tasks)}/${type}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }
        commit("setTasksList", resData);
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
