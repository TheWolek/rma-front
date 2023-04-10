<script>
import { mapState } from "vuex";
import store from "../../../store";

import { getUrl, itemsShelve, items } from "../../../helpers/endpoints";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      appliedFilter: (state) => state.items.appliedFilter,
      shelves: (state) => state.items.shelves,
    }),
  },
  methods: {
    toggleNewModal() {
      store.commit("items/toggleCreateModal");
    },
    toggleFindModal() {
      store.commit("items/toggleFindModal");
    },
    toggleShelveFindModal() {
      store.commit("items/toggleShelveFindModal");
    },
    fetchItemsData(url) {
      fetch(url)
        .then(async (res) => {
          const resData = await res.json();

          if (!res.ok) {
            if (res.status == 404) {
              store.commit("items/setItems", []);
              this.emitter.emit("refreshing", false);
              return;
            }
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }

          setTimeout(() => {
            store.commit("items/setItems", resData);
            this.emitter.emit("refreshing", false);
          }, 800);
        })
        .catch((error) => {
          return console.log(error);
        });
    },
    onRefresh() {
      if (this.appliedFilter.active) {
        this.emitter.emit("refreshing", true);
        if (this.appliedFilter.barcode != null) {
          this.fetchItemsData(
            `${getUrl(items)}?barcode=${this.appliedFilter.barcode}`
          );
          return;
        }

        if (this.appliedFilter.shelve != null) {
          let shelveId = this.shelves.find(
            (o) => o.code == this.appliedFilter.shelve
          ).shelve_id;
          this.fetchItemsData(`${getUrl(itemsShelve)}?shelve=${shelveId}`);
          return;
        }
      }
    },
  },
  mounted() {
    this.emitter.on("refreshing", (state) => {
      if (state) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    });
  },
};
</script>
<template>
  <div class="actions">
    <div class="actionBtn" id="btn1" @click="toggleNewModal">
      <img src="@/assets/add.svg" class="addImg" /> Dodaj
    </div>
    <div class="actionBtn" id="btn2" @click="toggleFindModal">
      <img src="@/assets/barcode.svg" />Kod kreskowy
    </div>
    <div class="actionBtn" id="btn3" @click="toggleShelveFindModal">
      <img src="@/assets/shelve.svg" />Lokalizacja
    </div>
    <div class="actionBtn" id="btn4"><img src="@/assets/delete.svg" />Usuń</div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
