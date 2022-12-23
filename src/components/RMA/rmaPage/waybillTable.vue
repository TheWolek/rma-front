<script>
import { mapGetters } from "vuex";
import waybillRow from "./waybillRow.vue";

export default {
  props: {
    withEdit: {
      required: false,
      default: false,
    },
  },
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
      <th v-if="withEdit" class="edit_col"></th>
    </tr>
    <waybillRow v-for="i in waybills" :data="i" :withEdit="withEdit" />
  </table>
</template>
<style scoped>
table {
  width: 100%;
  margin-left: 0.5em;
}

.edit_col {
  width: 6%;
}
</style>
