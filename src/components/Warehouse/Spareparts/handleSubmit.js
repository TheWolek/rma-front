import { mapState } from "vuex";
import store from "../../../store";

import waitUntil from "../../../utils/waitUntil";

export default {
  computed: {
    ...mapState({
      shelves: (state) => state.items.shelves,
    }),
  },
  methods: {
    handleSubmit_find(params) {
      console.log(params);
      let url = `http://localhost:3000/warehouse/spareparts/?`;

      if (params.cat !== undefined) url += `category=${params.cat}`;
      if (params.prod !== undefined) {
        if (params.cat !== undefined) url += `&`;
        url += `producer=${params.prod}`;
      }
      if (params.name !== undefined) {
        if (params.cat !== undefined || params.prod !== undefined) url += `&`;
        url += `name=${params.name}`;
      }

      fetch(url)
        .then(async (res) => {
          store.commit("spareparts/toggleRefreshTable", true);
          const resData = await res.json();
          let filters = {
            active: true,
            names: {},
          };

          if (params.cat !== undefined) filters.names.category = params.cat;
          if (params.prod !== undefined) filters.names.producer = params.prod;
          if (params.name !== undefined) filters.names.name = params.name;

          console.log(resData);

          if (!res.ok) {
            store.commit("spareparts/toggleRefreshTable", false);
            if (res.status == 404) {
              store.dispatch("spareparts/submitModal_Find", {
                data: [],
                filters: filters,
              });
              console.log("nothing was found");

              return;
            }
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }
          setTimeout(() => {
            store.dispatch("spareparts/submitModal_Find", {
              data: resData,
              filters: filters,
            });
            store.commit("spareparts/toggleRefreshTable", false);
          }, 500);
        })
        .catch((error) => {
          return console.log(error); //this.showError("error_form", error);
        });

      console.log(url);
    },
    handleSubmit_findByCode(code) {
      console.log(code);
      fetch(`http://localhost:3000/warehouse/spareparts/code?codes=${code}`)
        .then(async (res) => {
          const resData = await res.json();
          if (!res.ok) {
            if (res.status == 404) {
              store.commit("spareparts/clearActivePartDetails");
              store.commit("spareparts/toggleSnModal", false);
              this.$router.push({
                name: "spareparts",
                query: {},
              });
              return;
            }
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }
          store.commit("spareparts/setActivePartDetails", resData);
          store.commit("spareparts/togglePartDetailsSnTableActive", true);
          store.commit("spareparts/toggleSnModal", false);
          store.commit("spareparts/toggleFetchingPartDetails", true);
          store.dispatch("items/fetchAllShelves", null, { root: true });
          setTimeout(() => {
            store.commit("spareparts/togglePartDetailsPageActive", true);
            store.commit("spareparts/toggleFetchingPartDetails", false);
          }, 400);
        })
        .catch((error) => {
          return console.log(error);
        });
    },
  },
};
