<script>
import row from "./row.vue";

export default {
  props: ["data", "headers", "type"],
  components: { row },
};
</script>
<template>
  <table>
    <tr>
      <th v-for="el in headers">{{ el }}</th>
    </tr>
    <row v-for="row in data" :row="row" :type="type" />
  </table>
</template>
<style scoped>
table {
  width: 50%;
  margin: 0;
}

table tr th:nth-child(1),
table tr td:nth-child(1) {
  width: 10%;
}
</style>
