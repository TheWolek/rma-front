<script>
import { useRoute } from "vue-router";

import ChangeShelveActions from "@/components/Warehouse/Items/ChangeShelve/Actions.vue";
import ChangeShelveModal from "@/components/Warehouse/Items/ChangeShelve/Modal.vue";
import ChangeShelveForm from "@/components/Warehouse/Items/ChangeShelve/Form.vue";
import moveTaskList from "@/components/Warehouse/tasks/changeShelve/moveTaskList.vue";
import store from "@/store";
import { mapState } from "vuex";

export default {
  components: {
    ChangeShelveActions,
    ChangeShelveModal,
    ChangeShelveForm,
    moveTaskList,
  },
  computed: {
    ...mapState({
      shelves: (state) => state.items.shelves,
      taskListActive: (state) => state.changeShelve.taskListActive,
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
      <div class="warehouseItemsChangeShelve_content">
        <ChangeShelveForm />
        <moveTaskList v-if="taskListActive" />
      </div>
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

.warehouseItemsChangeShelve_content {
  display: flex;
  gap: 16px;
}
</style>
