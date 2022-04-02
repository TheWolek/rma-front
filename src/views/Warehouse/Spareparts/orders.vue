<script>
import actions from '../../../components/Warehouse/Spareparts/orders/actions.vue'
import createModal from '../../../components/Warehouse/Spareparts/orders/createModal.vue'
import Table from '../../../components/Warehouse/Spareparts/orders/ordersTable.vue'
import store from '../../../store'

export default {
  components: {actions, createModal, Table},
  mounted() {
    store.dispatch("sparepartsOrders/fetchAllCategories")
  }
}
</script>
<template>
  <div id="warehouseSparepartsOrders">
    <createModal/>
    <actions/>
    <div class="warehouseSparepartsOrders_wrap">
      <h1>Dostawy części zamiennych</h1>
      <Table/>
    </div>
  </div>
</template>

<style>
#warehouseSparepartsOrders {
    display: flex;
    flex-direction: column;
}

.warehouseSparepartsOrders_wrap {
  padding: .5em;
}
</style>
