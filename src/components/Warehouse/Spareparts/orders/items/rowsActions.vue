<script>
import { mapState } from "vuex";
import store from "../../../../../store";
import actionButtonSmall from "../../../../../parts/buttons/actionButtonSmall.vue";

export default {
  components: { actionButtonSmall },
  computed: {
    ...mapState({
      orderData: (state) => state.sparepartsOrders.ordersItems,
      activeNewRow: (state) => state.sparepartsOrders.activeNewRow,
      checkedItems: (state) => state.sparepartsOrders.orderItemsChecked,
    }),
    getImage() {
      return this.activeNewRow ? "cancel.svg" : "add.svg";
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
      if (this.checkedItems.length !== 0) {
        store.dispatch("sparepartsOrders/removeOrderItems", {
          toDel: this.checkedItems,
        });
      }
    },
  },
};
</script>
<template>
  <div class="buttonsWrap">
    <actionButtonSmall
      :event="onAdd"
      :display="getCopy"
      :icon="getImage"
      :disabled="this.orderData.orderData.status !== 0"
    />
    <actionButtonSmall
      :event="onDelete"
      display="Usuń"
      :icon="`delete.svg`"
      :disabled="this.orderData.orderData.status !== 0"
    />
    <actionButtonSmall
      :event="onChangeStatus"
      display="Zmień status"
      :icon="`change.svg`"
      :disabled="this.orderData.items.length === 0"
    />
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
</style>
