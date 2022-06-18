<script>
import { useRoute } from "vue-router";

import PartDetails from "../../../components/Warehouse/Spareparts/details/index.vue";
import store from "../../../store";

export default {
  components: { PartDetails },
  mounted() {
    const route = useRoute();
    const id = route.params.id;
    console.log(id);
    this.id = id;
    store.dispatch("spareparts/fetchActivePartDetails", this.id);
  },
  data() {
    return {
      id: null,
    };
  },
};
</script>
<template>
  <div id="warehouseSparepartsDetails">
    <div class="warehouseSparepartsDetails_wrap">
      <h1>Szczegóły części zamiennych</h1>
      <PartDetails />
    </div>
  </div>
</template>
<style scoped>
#warehouseSparepartsDetails {
  display: flex;
  flex-direction: column;
}

.warehouseSparepartsDetails_wrap {
  padding: 0.5em;
}
</style>
