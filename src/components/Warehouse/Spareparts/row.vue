<script>
export default {
  props: ["rowData"],
  data() {
    return {};
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
    <td>{{ this.rowData.part.category }}</td>
    <td>{{ this.rowData.part.producer }}</td>
    <td>{{ this.rowData.part.name }}</td>
    <td :class="{ noStock: this.isStockNull }">
      {{ this.rowData.warehouse.totalAmount + " szt" }}
    </td>
  </tr>
</template>
<style scoped>
td.noStock {
  color: var(--vt-c-red);
  font-weight: bold;
}
</style>
