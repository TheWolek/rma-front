<script>
import rmaActions from "@/components/RMA/rmaList/rmaActions.vue";
import rmaList from "@/components/RMA/rmaList/rmaList.vue";
import rmaFilters from "@/components/RMA/rmaList/rmaFilters.vue";
import filtersModal from "@/components/RMA/rmaList/modals/filters.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      filtersModalActive: (state) => state.rma.filtersModalActive,
    }),
  },
  components: {
    rmaActions,
    rmaList,
    rmaFilters,
    filtersModal,
  },
};
</script>
<template>
  <div id="rmaList">
    <filtersModal v-if="filtersModalActive" />
    <rmaActions />
    <div class="rmaList_wrap">
      <h1>Otwarte zgłoszenia serwisowe</h1>
      <rmaFilters />
      <rmaList />
    </div>
  </div>
</template>
<style>
.rmaList_wrap {
  padding: 0.5em;
}
</style>
