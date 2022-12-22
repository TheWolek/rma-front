<script>
import { mapGetters } from "vuex";
import waybillRow from "./waybillRow.vue";

export default {
  components: { waybillRow },
  computed: {
    ...mapGetters({
      waybills: "rma/getWaybills",
    }),
  },
};
</script>
<template>
  <table>
    <tr>
      <th>Numer listu</th>
      <th>Staus przesyłki</th>
      <th>Typ</th>
      <th>Data utworzenia</th>
      <th>Data zmiany statusu</th>
    </tr>
    <waybillRow v-for="i in waybills" :data="i" />
  </table>
</template>
<style scoped>
table {
  width: 100%;
  margin-left: 0.5em;
}
</style>
