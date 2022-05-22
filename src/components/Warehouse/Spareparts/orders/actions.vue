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
      store.commit("sparepartsOrders/toggleCreateModal");
    },
    toggleFindModal() {
      store.commit("sparepartsOrders/toggleFindModal");
    },
    onRefresh() {
      store.dispatch("sparepartsOrders/fetchOrdersByFilters");
    },
    onCancel() {
      if (this.editOrderMode) {
        store.commit("sparepartsOrders/toggleEditOrderMode");
        store.commit("sparepartsOrders/toggleActiveNewRow", false);
      }
    },
    onSave() {
      if (this.editOrderMode) {
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
    onRecive() {
      if (this.editOrderMode) {
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
  },
};
</script>
<template>
  <div class="actions">
    <div
      class="actionBtn"
      @click="toggleNewModal"
      :class="{ disabled: this.editOrderMode }"
    >
      <img src="@/assets/add.svg" class="addImg" /> Nowy
    </div>
    <div
      class="actionBtn"
      @click="onSave"
      :class="{ disabled: !this.editOrderMode || this.saveCoolDown !== 0 }"
    >
      <img src="@/assets/save.svg" class="saveImg" />Zapisz
    </div>
    <div
      class="actionBtn"
      @click="onCancel"
      :class="{ disabled: !this.editOrderMode }"
    >
      <img src="@/assets/cancel.svg" /> Anuluj
    </div>
    <div
      class="actionBtn"
      @click="onRecive"
      :class="{
        disabled: !this.editOrderMode,
      }"
    >
      <img src="@/assets/open-box.png" />
      Odbierz
    </div>
    <div
      class="actionBtn"
      @click="toggleFindModal"
      :class="{ disabled: this.editOrderMode }"
    >
      <img src="@/assets/search.svg" class="searchImg" /> Szukaj
    </div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
