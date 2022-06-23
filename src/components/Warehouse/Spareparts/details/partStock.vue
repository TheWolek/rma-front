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
        <th>Ilość</th>
      </tr>
      <partStockRow
        v-for="(part, key) in this.activePart.warehouse.parts_id"
        :key="key"
        :data="{
          id: part,
          shelve: this.activePart.warehouse.shelves[key],
          amount: this.activePart.warehouse.stock[key],
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
