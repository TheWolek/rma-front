<script>
import { mapState } from "vuex";

import partStockRow from "./partStockRow.vue";

export default {
  components: { partStockRow },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      activePart: (state) => state.spareparts.activePartDetails,
    }),
  },
};
</script>
<template>
  <div class="partStock">
    <div class="stockData">
      <div class="form-group">
        <label>Dostępne sztuki</label>
        <input type="text" :value="activePart.warehouse.totalAmount" disabled />
      </div>
    </div>
    <table>
      <tr>
        <th>Lokalizacja</th>
        <th>Numer seryjny</th>
      </tr>
      <partStockRow
        v-for="(sn, key) in this.activePart.warehouse.codes"
        :key="key"
        :data="{
          id: this.activePart.warehouse.parts_id[key],
          shelve: this.activePart.warehouse.shelves[key],
          sn: sn,
        }"
      />
    </table>
  </div>
</template>
<style scoped>
.stockData {
  display: flex;
  width: 12%;
}
</style>
