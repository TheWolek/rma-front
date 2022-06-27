<script>
import actions from "../../../components/Warehouse/Spareparts/actions.vue";
import partsTable from "../../../components/Warehouse/Spareparts/table.vue";
import findModal from "../../../components/Warehouse/Spareparts/findModal.vue";
import filters from "../../../components/Warehouse/Spareparts/filters.vue";
import partData from "../../../components/Warehouse/Spareparts/details/partData.vue";
import partStock from "../../../components/Warehouse/Spareparts/details/partStock.vue";
import snModal from "../../../components/Warehouse/Spareparts/snModal.vue";
import partSnTable from "../../../components/Warehouse/Spareparts/details/partSnTable.vue";
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
    snModal,
    partSnTable,
    loadingDots,
  },
  computed: {
    ...mapState({
      isPartDetailsPageActive: (state) =>
        state.spareparts.partDetailsPageActive,
      loading: (state) => state.spareparts.fetchingPartDetails,
      isSnTableActive: (state) => state.spareparts.partDetailsSnTableActive,
    }),
  },
};
</script>

<template>
  <div id="warehouseSpareparts">
    <findModal />
    <snModal />
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
        <partStock v-if="!isSnTableActive" />
        <partSnTable v-if="isSnTableActive" />
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
