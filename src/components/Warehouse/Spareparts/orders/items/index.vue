<script>
import { mapState } from "vuex";
import itemsTable from "./itemsTable.vue";
import orderDetails from "./orderDetails.vue";
import rowsActions from "./rowsActions.vue";

export default {
  components: { itemsTable, orderDetails, rowsActions },
  computed: {
    ...mapState({}),
  },
};
</script>
<template>
  <div>
    <orderDetails />
    <rowsActions />
    <itemsTable />
  </div>
</template>
<style scoped></style>
