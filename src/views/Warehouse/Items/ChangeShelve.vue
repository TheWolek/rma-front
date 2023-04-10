<script>
import { useRoute } from "vue-router";

import ChangeShelveActions from "@/components/Warehouse/Items/ChangeShelve/Actions.vue";
import ChangeShelveModal from "@/components/Warehouse/Items/ChangeShelve/Modal.vue";
import ChangeShelveForm from "@/components/Warehouse/Items/ChangeShelve/Form.vue";
import store from "../../../store";
import { mapState } from "vuex";

export default {
  components: { ChangeShelveActions, ChangeShelveModal, ChangeShelveForm },
  computed: {
    ...mapState({
      shelves: (state) => state.items.shelves,
    }),
  },
  mounted() {
    const route = useRoute();
    if (
      route.params.barcode != undefined &&
      route.params.activeShelve != undefined
    ) {
      store.dispatch("changeShelve/setDataFromOutside", {
        outside_barcode: route.params.barcode,
        outside_shelve_id: route.params.activeShelve,
        outside_shelve_code: this.shelves[route.params.activeShelve].code,
      });
    }
  },
};
</script>
<template>
  <div id="warehouseItemsChangeShelve">
    <ChangeShelveModal />
    <ChangeShelveActions />
    <div class="warehouseItemsChangeShelve_wrap">
      <h1>Zmiana lokalizacji produktu</h1>
      <ChangeShelveForm />
    </div>
  </div>
</template>

<style>
#warehouseItemsChangeShelve {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.warehouseItemsChangeShelve_wrap {
  padding: 0.5em;
}
</style>
