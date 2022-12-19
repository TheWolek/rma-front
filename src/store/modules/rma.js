import router from "../../router";

const state = {};

const mutations = {};

const actions = {
  submitNewTicket({ commit, state }, data) {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/rma/create", requestOptions)
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          const error = (resData && resData.message) || res.status;
          return Promise.reject(error);
        }

        console.log(resData);
        router.push({
          path: "items",
          query: { ticketId: resData.ticketId },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
