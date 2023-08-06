<script>
import { mapGetters } from "vuex";
import packageRow from "../../../views/Warehouse/collectPackages/packageRow.vue";

export default {
  components: { packageRow },
  computed: {
    ...mapGetters({
      details: "collectPackages/getCollectDetails",
    }),
  },
};
</script>
<template>
  <table>
    <tr>
      <th>Nr listu</th>
      <th>Kod kreskowy</th>
    </tr>
    <packageRow v-for="item in this.details.items" :item="item" />
  </table>
</template>
