<script>
import rmaActions from "../../components/RMA/rmaList/rmaActions.vue";
import rmaList from "../../components/RMA/rmaList/rmaList.vue";
import rmaFilters from "../../components/RMA/rmaList/rmaFilters.vue";
import rmaPageActions from "../../components/RMA/rmaList/rmaPage/rmaPageActions.vue";
import rmaPage from "../../components/RMA/rmaList/rmaPage/rmaPage.vue";

import filtersModal from "../../components/RMA/rmaList/modals/filters.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      rmaPageActive: (state) => state.rma.rmaPageActive,
      filtersModalActive: (state) => state.rma.filtersModalActive,
    }),
  },
  components: {
    rmaActions,
    rmaList,
    rmaFilters,
    rmaPageActions,
    rmaPage,
    filtersModal,
  },
};
</script>
<template>
  <div id="rmaList">
    <filtersModal v-if="filtersModalActive" />
    <rmaActions v-if="!rmaPageActive" />
    <rmaPageActions v-if="rmaPageActive" />
    <div class="rmaList_wrap">
      <h1 v-if="!rmaPageActive">Otwarte zgłoszenia serwisowe</h1>
      <h1 v-if="rmaPageActive">Zgłoszenie 000000</h1>
      <rmaFilters v-if="!rmaPageActive" />
      <rmaList v-if="!rmaPageActive" />
      <rmaPage v-if="rmaPageActive" />
    </div>
  </div>
</template>
<style scoped>
.rmaList_wrap {
  padding: 0.5em;
}
</style>
