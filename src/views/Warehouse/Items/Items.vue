<script>
import ItemsActions from "../../../components/Warehouse/Items/itemsActions.vue";
import ItemCreateModal from "../../../components/Warehouse/Items/itemCreateModal.vue";
import itemsTable from "../../../components/Warehouse/Items/itemsTable.vue";
import ItemsTable from "../../../components/Warehouse/Items/itemsTable.vue";
import ItemFindModal from '../../../components/Warehouse/Items/itemFindModal.vue'

export default {
    components: { ItemsActions, ItemCreateModal, itemsTable, ItemsTable, ItemFindModal },
}
</script>

<template>
  <div id="warehouseItems">
    <ItemCreateModal/>
    <ItemFindModal/>
    <div class="warehouseItems_wrap">
      <ItemsActions/>
      <h1>This is warehouse items page</h1>
      <ItemsTable/>
    </div>
  </div>
</template>

<style>
#warehouseItems {
    min-height: 94vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.warehouseItems_wrap {
  padding: .5em;
}

</style>
