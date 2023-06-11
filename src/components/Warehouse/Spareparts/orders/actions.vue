<script>
import { mapState } from "vuex";
import store from "../../../../store";
import actionButton from "../../../../parts/buttons/actionButton.vue";
import actionButtonRefresh from "../../../../parts/buttons/actionButtonRefresh.vue";

import { getUrl, sparepartsOrdersEdit } from "../../../../helpers/endpoints";

export default {
  data() {
    return {
      saveCoolDown: 0,
    };
  },
  components: {
    actionButton,
    actionButtonRefresh,
  },
  methods: {
    toggleNewModal() {
      if (!this.disabledNew) store.commit("sparepartsOrders/toggleCreateModal");
    },
    toggleFindModal() {
      if (!this.disabledSearch)
        store.commit("sparepartsOrders/toggleFindModal");
    },
    onRefresh() {
      store.dispatch("sparepartsOrders/fetchOrdersByFilters");
    },
    onCancel() {
      if (this.editOrderMode && !this.disabledCancel) {
        store.commit("sparepartsOrders/toggleEditOrderMode");
        store.commit("sparepartsOrders/toggleActiveNewRow", false);
        store.commit("sparepartsOrders/clearOrdersItems");
      }
    },
    onSave() {
      if (this.editOrderMode && !this.disabledSave) {
        this.setSaveCoolDown();
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.order),
        };

        fetch(getUrl(sparepartsOrdersEdit), requestOptions)
          .then(async (res) => {
            const resData = await res.json();

            if (!res.ok) {
              const error = (resData && resData.message) || res.status;
              return Promise.reject(error);
            }

            store.dispatch("sparepartsOrders/toggleEditOrder", {
              ...this.order.orderData,
              open: false,
            });
          })
          .catch((error) => {
            return console.log(error);
          });
      }
    },
    setSaveCoolDown() {
      this.saveCoolDown = 3;
      const timer = setInterval(() => {
        if (this.saveCoolDown === 0) {
          clearInterval(timer);
          return;
        }
        this.saveCoolDown--;
      }, 1000);
    },
    onRecive(a) {
      if (this.editOrderMode && !this.disabledRecive) {
        store.commit("sparepartsOrders/toggleEditSNModal");

        // store.dispatch("sparepartsOrders/reciveOrder", {
        //   order_id: this.order.orderData.part_order_id,
        //   status: 2,
        // });
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.sparepartsOrders.refreshingTable,
      editOrderMode: (state) => state.sparepartsOrders.editOrderMode,
      order: (state) => state.sparepartsOrders.ordersItems,
    }),
    disabledNew() {
      return this.editOrderMode;
    },
    disabledSave() {
      return (
        !this.editOrderMode ||
        this.saveCoolDown !== 0 ||
        this.order.orderData.status === 2
      );
    },
    disabledCancel() {
      return !this.editOrderMode;
    },
    disabledRecive() {
      return (
        !this.editOrderMode || ![1, 3].includes(this.order.orderData.status)
      );
    },
    disabledSearch() {
      return this.editOrderMode;
    },
  },
};
</script>
<template>
  <div class="actions">
    <actionButton
      :event="toggleNewModal"
      display="Nowy"
      :icon="`add.svg`"
      :disabled="this.disabledNew"
    />
    <actionButton
      :event="onSave"
      display="Zapisz"
      :icon="`save.svg`"
      :disabled="this.disabledSave"
    />
    <actionButton
      :event="onCancel"
      display="Anuluj"
      :icon="`cancel.svg`"
      :disabled="this.disabledCancel"
    />
    <actionButton
      :event="onRecive"
      display="Odbierz"
      :icon="`open-box.png`"
      :disabled="this.disabledRecive"
    />
    <actionButton
      :event="toggleFindModal"
      display="Szukaj"
      :icon="`search.svg`"
      :disabled="this.disabledSearch"
    />
    <actionButtonRefresh :event="onRefresh" :loading="this.loading" />
  </div>
</template>
