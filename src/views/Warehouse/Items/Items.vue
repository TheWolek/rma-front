<script>
import ItemsActions from "@/components/Warehouse/Items/itemsActions.vue";
import ItemCreateModal from "@/components/Warehouse/Items/itemCreateModal.vue";
import ItemsTable from "@/components/Warehouse/Items/itemsTable.vue";
import ItemFindModal from "@/components/Warehouse/Items/itemFindModal.vue";
import ItemShelveFindModal from "@/components/Warehouse/Items/itemShelveFindModal.vue";
import filters from "@/components/Warehouse/Items/filters.vue";
import handleSubmit from "@/components/Warehouse/Items/handleSubmit";

import { useRoute } from "vue-router";
import store from "../../../store";

export default {
  setup() {
    store.dispatch("items/fetchAllShelves");
  },
  extends: handleSubmit,
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
    if (route.query.shelve) {
      return this.handleSubmit_shelveFind("url", route.query.shelve);
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
