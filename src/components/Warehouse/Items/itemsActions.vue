<script>
import { mapState } from "vuex";
import store from "../../../store";
import actionButton from "../../../parts/buttons/actionButton.vue";
import actionButtonRefresh from "../../../parts/buttons/actionButtonRefresh.vue";

import { getUrl, itemsShelve, items } from "../../../helpers/endpoints";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    actionButton,
    actionButtonRefresh,
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
    <actionButton :event="toggleNewModal" display="Dodaj" :icon="`add.svg`" />
    <actionButton
      :event="toggleFindModal"
      display="Kod kreskowy"
      :icon="`barcode.svg`"
    />
    <actionButton
      :event="toggleShelveFindModal"
      display="Lokalizacja"
      :icon="`shelve.svg`"
    />
    <div class="actionBtn" id="btn4"><img src="@/assets/delete.svg" />Usuń</div>
    <actionButtonRefresh :event="onRefresh" :loading="this.loading" />
  </div>
</template>
