<script>
import { mapState } from "vuex";
import itemsTable from "./itemsTable.vue";
import orderDetails from "./orderDetails.vue";

export default {
  components: { itemsTable, orderDetails },
  computed: {
    ...mapState({}),
  },
};
</script>
<template>
  <div>
    <orderDetails />
    <itemsTable />
  </div>
</template>
<style scoped></style>
