<script>
import { mapState } from "vuex";
import store from "../../../../../store";

export default {
  computed: {
    ...mapState({
      orderData: (state) => state.sparepartsOrders.ordersItems,
      activeNewRow: (state) => state.sparepartsOrders.activeNewRow,
    }),
    getImage() {
      return this.activeNewRow
        ? "/src/assets/cancel.svg"
        : "/src/assets/add.svg";
    },
    getCopy() {
      return this.activeNewRow ? "Anuluj" : "Dodaj";
    },
  },
  methods: {
    onAdd() {
      store.commit("sparepartsOrders/toggleActiveNewRow");
    },
    onChangeStatus() {
      store.dispatch("sparepartsOrders/toggleEditModal", {
        ...this.orderData.orderData,
        mode: "status",
      });
    },
    onDelete() {
      // store.commit()
    },
  },
};
</script>
<template>
  <div class="buttonsWrap">
    <div
      class="actionBtn small"
      @click="onAdd"
      :class="{ disabled: this.orderData.orderData.status !== 0 }"
    >
      <img :src="getImage" /> {{ getCopy }}
    </div>
    <div
      class="actionBtn small"
      :class="{ disabled: this.orderData.orderData.status !== 0 }"
      @click="onDelete"
    >
      <img src="@/assets/delete.svg" /> Usuń
    </div>
    <div
      class="actionBtn small"
      :class="{ disabled: this.orderData.items.length === 0 }"
      @click="onChangeStatus"
    >
      <img src="@/assets/change.svg" /> Zmień status
    </div>
  </div>
</template>
<style scoped>
.buttonsWrap {
  /* height: 1.7em; */
  margin-top: 0.5em;
  margin-bottom: 0.3em;
  display: flex;
  gap: 0.1em;
}

.actionBtn.small {
  font-size: 0.82rem;
  font-weight: 700;
}

.actionBtn.small img {
  width: 14px;
}

.actionBtn.small:nth-child(1) {
  width: 74px;
}
</style>
