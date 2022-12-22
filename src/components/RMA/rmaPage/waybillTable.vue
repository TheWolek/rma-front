<script>
import waybillRow from "./waybillRow.vue";

export default {
  components: { waybillRow },
};
</script>
<template>
  <table>
    <tr>
      <th class="lp_col">Lp</th>
      <th>Numer listu</th>
      <th>Staus przesyłki</th>
      <th>Data utworzenia</th>
      <th>Data zmiany statusu</th>
    </tr>
    <waybillRow />
  </table>
</template>
<style scoped>
table {
  width: 100%;
  margin-left: 0.5em;
}

.lp_col {
  width: 7%;
}
</style>
