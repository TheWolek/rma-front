<script>
import { mapState } from "vuex";
import formatDate from "../../../../../utils/formatDate";

export default {
  data() {
    return {
      status: {},
      supplier: {},
    };
  },
  computed: {
    ...mapState({
      order: (state) => state.sparepartsOrders.ordersItems,
      statuses: (state) => state.sparepartsOrders.statuses,
      suppliers: (state) => state.sparepartsOrders.suppliers,
    }),
    getStatus() {
      return this.statuses[this.order.orderData.status];
    },
    getSupplier() {
      return this.suppliers.find(
        (o) => o.id == this.order.orderData.supplier_id
      );
    },
  },
  methods: {
    getDate() {
      return formatDate(this.order.orderData.expected_date);
    },
  },
};
</script>
<template>
  <div class="orderDetails">
    <div class="group">
      <label>Data dostawy</label>
      <input type="text" :value="this.getDate()" disabled />
    </div>
    <div class="group">
      <label>Status</label>
      <input type="text" :value="this.getStatus.name" disabled />
    </div>
    <div class="group">
      <label>Dostawca</label>
      <input type="text" :value="this.getSupplier.name" disabled />
    </div>
  </div>
</template>
<style scoped>
.orderDetails {
  margin-left: 1em;
  padding-bottom: 0.5em;
  display: flex;
}

.group {
  width: 12%;
}

.group label {
  color: var(--vt-c-black-mute);
}
</style>
