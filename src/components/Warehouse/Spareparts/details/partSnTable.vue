<script>
import { mapState } from "vuex";
import partSnTableRow from "./partSnTableRow.vue";

export default {
  components: {
    partSnTableRow,
  },
  computed: {
    ...mapState({
      activePartDetails: (state) => state.spareparts.activePartDetails,
    }),
  },
};
</script>
<template>
  <div class="partSnTable">
    <table>
      <tr>
        <th>Lokalizacja</th>
        <th>Kod kreskowy</th>
      </tr>
      <partSnTableRow :rowData="activePartDetails.warehouse" />
      <!-- <partStockRow
        v-for="(part, key) in this.activePart.warehouse.parts_id"
        :key="key"
        :data="{
          id: part,
          shelve: this.activePart.warehouse.shelves[key],
          amount: this.activePart.warehouse.stock[key],
        }"
      /> -->
    </table>
  </div>
</template>
