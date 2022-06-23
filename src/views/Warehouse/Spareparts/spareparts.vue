<script>
import actions from "../../../components/Warehouse/Spareparts/actions.vue";
import partsTable from "../../../components/Warehouse/Spareparts/table.vue";
import findModal from "../../../components/Warehouse/Spareparts/findModal.vue";
import filters from "../../../components/Warehouse/Spareparts/filters.vue";
import partData from "../../../components/Warehouse/Spareparts/details/partData.vue";
import partStock from "../../../components/Warehouse/Spareparts/details/partStock.vue";
import loadingDots from "../../../components/icons/loadingDots.vue";
import { mapState } from "vuex";

export default {
  components: {
    actions,
    findModal,
    partsTable,
    filters,
    partData,
    partStock,
    loadingDots,
  },
  computed: {
    ...mapState({
      isPartDetailsPageActive: (state) =>
        state.spareparts.partDetailsPageActive,
      loading: (state) => state.spareparts.fetchingPartDetails,
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
      <loadingDots :active="loading" v-if="loading" />
      <div v-if="!isPartDetailsPageActive && !loading">
        <filters />
        <partsTable />
      </div>
      <div v-if="isPartDetailsPageActive && !loading">
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
