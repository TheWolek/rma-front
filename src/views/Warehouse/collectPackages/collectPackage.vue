<script>
import { useRoute } from "vue-router";
import store from "@/store";
import actions from "../../../components/Warehouse/collectPackages/actions.vue";
import collectDetails from "@/components/Warehouse/collectPackages/details.vue";
import addForm from "@/components/Warehouse/collectPackages/addForm.vue";
import addedTable from "@/components/Warehouse/collectPackages/addedTable.vue";

export default {
  mounted() {
    const route = useRoute();
    const id = route.params.id;
    store.dispatch("collectPackages/fetchDetails", id);
  },
  components: { actions, collectDetails, addForm, addedTable },
};
</script>
<template>
  <div id="warehouseCollectPackages">
    <actions />
    <div class="warehouseCollectPackages_wrap">
      <collectDetails />
      <addForm />
      <addedTable />
    </div>
  </div>
</template>
<style>
#warehouseCollectPackages {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.warehouseCollectPackages_wrap {
  padding: 0.5em;
}

.form-group {
  width: 40%;
}
</style>
