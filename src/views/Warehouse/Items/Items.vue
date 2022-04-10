<script>
import ItemsActions from "../../../components/Warehouse/Items/itemsActions.vue";
import ItemCreateModal from "../../../components/Warehouse/Items/itemCreateModal.vue";
import ItemsTable from "../../../components/Warehouse/Items/itemsTable.vue";
import ItemFindModal from "../../../components/Warehouse/Items/itemFindModal.vue";
import ItemShelveFindModal from "../../../components/Warehouse/Items/itemShelveFindModal.vue";
import filters from "../../../components/Warehouse/Items/filters.vue";
import handleSubmit_find from "../../../components/Warehouse/Items/handleSubmit_find";

import { useRoute } from "vue-router";

export default {
  extends: handleSubmit_find,
  components: {
    ItemsActions,
    ItemCreateModal,
    ItemsTable,
    ItemFindModal,
    ItemShelveFindModal,
    filters,
  },
  mounted() {
    const route = useRoute();
    if (route.query.code) {
      return this.handleSubmit_find("url", route.query.code);
    }
  },
  methods: {},
};
</script>

<template>
  <div id="warehouseItems">
    <ItemCreateModal />
    <ItemFindModal />
    <ItemShelveFindModal />
    <ItemsActions />
    <div class="warehouseItems_wrap">
      <h1>Wszystkie zarejestrowane produkty</h1>
      <filters />
      <ItemsTable />
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
  padding: 0.5em;
}
</style>
