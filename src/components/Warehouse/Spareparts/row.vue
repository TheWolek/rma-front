<script>
import store from "../../../store";

export default {
  props: ["rowData"],
  data() {
    return {
      id: this.rowData.part.cat_id,
    };
  },
  computed: {
    isStockNull() {
      let totalAmount = this.rowData.warehouse.totalAmount;
      if (totalAmount === 0) return true;
      else return false;
    },
  },
  methods: {
    reditect() {
      if (!this.isStockNull) {
        this.$router.push({
          path: this.$route.path + "/stock",
          query: { part_cat: this.id },
        });
        store.dispatch("spareparts/openPartDetails", this.id);
      }
    },
  },
};
</script>
<template>
  <tr :id="this.rowData.part.cat_id" @click="reditect">
    <td><input type="checkbox" :id="this.rowData.part.cat_id" /></td>
    <td>
      {{ this.rowData.part.category }}
    </td>
    <td>
      {{ this.rowData.part.producer }}
    </td>
    <td>
      {{ this.rowData.part.name }}
    </td>
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
td a {
  color: var(--vt-c-black);
  display: block;
}
tr:hover td {
  cursor: pointer;
  background-color: #e9e9e9;
}
</style>
