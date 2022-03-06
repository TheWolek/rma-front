<script>
import ItemsActions from "../../../components/Warehouse/Items/itemsActions.vue";
import ItemCreateModal from "../../../components/Warehouse/Items/itemCreateModal.vue";

export default {
    components: { ItemsActions, ItemCreateModal }
}
</script>

<template>
  <div id="warehouseItems">
    <ItemCreateModal/>
    <ItemsActions/>
    <h1>This is warehouse items page</h1>
  </div>
</template>

<style>
#warehouseItems {
    min-height: 94vh;
    display: flex;
    flex-direction: column;
    padding: .5em;
    position: relative;
}

h1 {
  grid-area: main;
}
</style>
