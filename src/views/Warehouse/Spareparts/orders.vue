<script>
import actions from '../../../components/Warehouse/Spareparts/orders/actions.vue'
import createModal from '../../../components/Warehouse/Spareparts/orders/createModal.vue'
import findModal from '../../../components/Warehouse/Spareparts/orders/findModal.vue'
import editModal from '../../../components/Warehouse/Spareparts/orders/editModal.vue'
import Table from '../../../components/Warehouse/Spareparts/orders/ordersTable.vue'
import filters from '../../../components/Warehouse/Spareparts/orders/filters.vue'
import store from '../../../store'

export default {
  components: {actions, createModal, findModal, editModal, Table, filters},
  mounted() {
    store.dispatch("sparepartsOrders/fetchAllCategories")
  }
}
</script>
<template>
  <div id="warehouseSparepartsOrders">
    <createModal/>
    <findModal/>
    <editModal/>
    <actions/>
    <div class="warehouseSparepartsOrders_wrap">
      <h1>Dostawy części zamiennych</h1>
      <filters/>
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
