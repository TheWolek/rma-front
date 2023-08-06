import {
  getUrl,
  collectPackages,
  collectPackagesAdd,
  collectPackagesItems,
} from "../../../helpers/endpoints";
import router from "../../../router";

const state = {
  listOfCollects: [],
  collecDetails: {
    created: "",
    id: null,
    items: [],
    ref_name: "",
    status: "",
  },
  filtersActive: {
    active: false,
    refName: "",
  },
  loading: false,
};

const getters = {
  getListOfCollects(state) {
    return state.listOfCollects;
  },
  getCollectDetails(state) {
    return state.collecDetails;
  },
  getFilters(state) {
    return state.filtersActive;
  },
  getLoading(state) {
    return state.loading;
  },
};

const mutations = {
  setList(state, newList) {
    state.listOfCollects = newList;
  },
  setCollectDetails(state, data) {
    state.collecDetails = data;
  },
  setFilters(state, filters) {
    state.filtersActive = filters;
  },
  setLoading(state, newState) {
    state.loading = newState;
  },
};

const actions = {
  addNewCollect({ dispatch }, refName) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refName: refName,
      }),
    };

    fetch(getUrl(collectPackagesAdd), requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        // dispatch("fetchDetails", resData.collectId);
        router.push({
          name: "collectPackage",
          params: { id: resData.collectId },
        });
      })
      .catch((error) => console.log(error));
  },
  addNewItemToList({ dispatch }, { collectId, waybill }) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        waybill: waybill,
      }),
    };

    fetch(`${getUrl(collectPackagesItems)}/${collectId}/add`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("fetchDetails", collectId);
      })
      .catch((error) => console.log(error));
  },
  fetchList({ commit }, params) {
    commit("setLoading", true);
    let url = getUrl(collectPackages);
    let paramCount = 0;
    if (params.refName !== undefined && params.refName !== "") {
      url += `?refName=${params.refName}`;
      paramCount += 1;
    }

    if (params.created !== undefined && params.created !== "") {
      if (paramCount > 0) url += "&";
      else url += "?";

      url += `created=${params.created}`;
      paramCount += 1;
    }

    fetch(`${url}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setList", resData);
        commit("setLoading", false);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchDetails({ commit }, id) {
    fetch(`${getUrl(collectPackages)}/${id}`)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        commit("setCollectDetails", resData);
      })
      .catch((error) => {
        console.log(error);
        router.push({
          name: "collectPackagesList",
        });
      });
  },
  finishCollect({ dispatch }, collectId) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${getUrl(collectPackages)}/${collectId}`, requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        dispatch("fetchDetails", collectId);
      })
      .catch((error) => console.log(error));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
