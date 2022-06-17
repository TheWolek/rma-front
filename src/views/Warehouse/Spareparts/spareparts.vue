<script>
import actions from "../../../components/Warehouse/Spareparts/actions.vue";
import findModal from "../../../components/Warehouse/Spareparts/findModal.vue";
import store from "../../../store";

export default {
  components: {
    actions,
    findModal,
  },
  mounted() {
    store.dispatch("spareparts/fetchAllCategories");
  },
};
</script>

<template>
  <div id="warehouseSpareparts">
    <findModal />
    <actions />
    <div class="warehouseSpareparts_wrap">
      <h1>Zarejestrowane części zamienne</h1>
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
