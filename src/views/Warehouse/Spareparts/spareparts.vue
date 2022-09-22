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
import handleSubmit from "../../../components/Warehouse/Spareparts/handleSubmit";
import { mapState } from "vuex";
import { useRoute } from "vue-router";
import store from "../../../store";

export default {
  setup() {
    store.dispatch("items/fetchAllShelves");
  },
  extends: handleSubmit,
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
  mounted() {
    const route = useRoute();
    console.log(route.query);
    if (route.query.cat || route.query.prod || route.query.name) {
      return this.handleSubmit_find(route.query);
    }

    if (route.query.code) {
      return;
    }

    if (route.query.part_cat) {
      const reg = /^\d{1,}$/;
      if (reg.test(route.query.part_cat))
        return store.dispatch(
          "spareparts/openPartDetails",
          route.query.part_cat
        );
    }
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
