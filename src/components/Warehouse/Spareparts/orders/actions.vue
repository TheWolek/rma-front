<script>
import { mapState } from "vuex";
import store from "../../../../store";
export default {
  data() {
    return {
      saveCoolDown: 0,
    };
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

        fetch(
          "http://localhost:3000/warehouse/spareparts/orders/edit",
          requestOptions
        )
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

            console.log("saved");
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
    <div
      class="actionBtn"
      @click="toggleNewModal"
      :class="{ disabled: disabledNew }"
    >
      <img src="@/assets/add.svg" class="addImg" /> Nowy
    </div>
    <div class="actionBtn" @click="onSave" :class="{ disabled: disabledSave }">
      <img src="@/assets/save.svg" class="saveImg" />Zapisz
    </div>
    <div
      class="actionBtn"
      @click="onCancel"
      :class="{ disabled: disabledCancel }"
    >
      <img src="@/assets/cancel.svg" /> Anuluj
    </div>
    <div
      class="actionBtn"
      @click="onRecive"
      :class="{
        disabled: disabledRecive,
      }"
    >
      <img src="@/assets/open-box.png" />
      Odbierz
    </div>
    <div
      class="actionBtn"
      @click="toggleFindModal"
      :class="{ disabled: disabledSearch }"
    >
      <img src="@/assets/search.svg" class="searchImg" /> Szukaj
    </div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
