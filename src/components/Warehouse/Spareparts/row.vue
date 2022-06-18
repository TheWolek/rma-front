<script>
import { RouterLink } from "vue-router";

export default {
  props: ["rowData"],
  data() {
    return {
      url: `/warehouse/spareparts/${this.rowData.part.cat_id}`,
    };
  },
  computed: {
    isStockNull() {
      let totalAmount = this.rowData.warehouse.totalAmount;
      if (totalAmount === 0) return true;
      else return false;
    },
  },
  mounted() {},
  methods: {},
};
</script>
<template>
  <tr :id="this.rowData.part.cat_id">
    <td><input type="checkbox" :id="this.rowData.part.cat_id" /></td>
    <td>
      <RouterLink :to="this.url">{{ this.rowData.part.category }}</RouterLink>
    </td>
    <td>
      <RouterLink :to="this.url">{{ this.rowData.part.producer }}</RouterLink>
    </td>
    <td>
      <RouterLink :to="this.url">{{ this.rowData.part.name }}</RouterLink>
    </td>
    <td :class="{ noStock: this.isStockNull }">
      <RouterLink :to="this.url">{{
        this.rowData.warehouse.totalAmount + " szt"
      }}</RouterLink>
    </td>
  </tr>
</template>
<style scoped>
td.noStock {
  color: var(--vt-c-red);
  font-weight: bold;
}
td a {
  color: var(--vt-c-black);
  display: block;
}
tr:hover td {
  background-color: #e9e9e9;
}
</style>
