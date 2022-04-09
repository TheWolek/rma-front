<script>
import actions from "../../../components/Warehouse/Spareparts/orders/actions.vue";
import createModal from "../../../components/Warehouse/Spareparts/orders/createModal.vue";
import findModal from "../../../components/Warehouse/Spareparts/orders/findModal.vue";
import editModal from "../../../components/Warehouse/Spareparts/orders/editModal.vue";
import Table from "../../../components/Warehouse/Spareparts/orders/ordersTable.vue";
import filters from "../../../components/Warehouse/Spareparts/orders/filters.vue";
import items from "../../../components/Warehouse/Spareparts/orders/items/index.vue";
import store from "../../../store";
import { mapState } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    actions,
    createModal,
    findModal,
    editModal,
    Table,
    filters,
    items,
  },
  computed: {
    ...mapState({
      editOrderMode: (state) => state.sparepartsOrders.editOrderMode,
    }),
  },
  mounted() {
    store.dispatch("sparepartsOrders/fetchAllCategories");
    store.dispatch("sparepartsOrders/fetchAllSuppliers");
  },
};
</script>
<template>
  <div id="warehouseSparepartsOrders">
    <createModal />
    <findModal />
    <editModal />
    <actions />
    <div class="warehouseSparepartsOrders_wrap">
      <h1>Dostawy części zamiennych</h1>
      <filters v-if="!this.editOrderMode" />
      <Table v-if="!this.editOrderMode" />
      <items v-if="this.editOrderMode" />
    </div>
  </div>
</template>

<style>
#warehouseSparepartsOrders {
  display: flex;
  flex-direction: column;
}

.warehouseSparepartsOrders_wrap {
  padding: 0.5em;
}
</style>
