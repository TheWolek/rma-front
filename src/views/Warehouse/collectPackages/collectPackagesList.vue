<script>
// import { mapGetters } from "vuex";
import list from "../../../components/Warehouse/collectPackages/list/list.vue";
import filters from "../../../components/Warehouse/collectPackages/list/filters.vue";
import store from "../../../store";

export default {
  components: { list, filters },
  // computed: {
  //   ...mapGetters({
  //     getFilters: "collactionPackages/getFilters",
  //   }),
  // },
  mounted() {
    store.dispatch("collectPackages/fetchList", {});
  },
};
</script>
<template>
  <div id="warehouseCollectPackagesList">
    <div class="warehouseCollectPackagesList_wrap">
      <h1>Wszystkie odbiory paczek</h1>
      <filters />
      <list />
    </div>
  </div>
</template>
<style>
#warehouseCollectPackagesList {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.warehouseCollectPackagesList_wrap {
  padding: 0.5em;
}
</style>
