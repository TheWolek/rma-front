<script>
import actions from "../../../components/Warehouse/Spareparts/actions.vue";
import partsTable from "../../../components/Warehouse/Spareparts/table.vue";
import findModal from "../../../components/Warehouse/Spareparts/findModal.vue";
import filters from "../../../components/Warehouse/Spareparts/filters.vue";
import partData from "../../../components/Warehouse/Spareparts/details/partData.vue";
import partStock from "../../../components/Warehouse/Spareparts/details/partStock.vue";
import { mapState } from "vuex";

export default {
  components: {
    actions,
    findModal,
    partsTable,
    filters,
    partData,
    partStock,
  },
  computed: {
    ...mapState({
      isPartDetailsPageActive: (state) =>
        state.spareparts.partDetailsPageActive,
    }),
  },
};
</script>

<template>
  <div id="warehouseSpareparts">
    <findModal />
    <actions />
    <div class="warehouseSpareparts_wrap">
      <h1>Zarejestrowane części zamienne</h1>
      <div v-if="!isPartDetailsPageActive">
        <filters />
        <partsTable />
      </div>
      <div v-if="isPartDetailsPageActive">
        <partData />
        <partStock />
      </div>
    </div>
  </div>
</template>

<style>
#warehouseSpareparts {
  display: flex;
  flex-direction: column;
}

.warehouseSpareparts_wrap {
  padding: 0.5em;
}
</style>
