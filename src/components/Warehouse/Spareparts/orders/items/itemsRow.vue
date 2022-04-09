<script>
import { mapState } from "vuex";

export default {
  props: ["data"],
  data() {
    return {
      modelData: {},
      check: false,
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.sparepartsOrders.categories,
    }),
  },
  mounted() {
    this.modelData = this.categories.find(
      (o) => o.part_cat_id === this.data.part_cat_id
    );
  },
};
</script>
<template>
  <tr>
    <td><input type="checkbox" /></td>
    <td>{{ this.modelData.producer }}</td>
    <td>{{ this.modelData.name }}</td>
    <td>{{ this.data.amount }}</td>
  </tr>
</template>
<style scoped></style>
