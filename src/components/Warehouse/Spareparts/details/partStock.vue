<script>
import { mapState } from "vuex";

import partStockRow from "./partStockRow.vue";

export default {
  components: { partStockRow },
  data() {
    return {
      totalAmount: null,
    };
  },
  computed: {
    ...mapState({
      activePart: (state) => state.spareparts.activePartDetails,
    }),
  },
  mounted() {
    //this.totalAmount = this.activePart.warehouse.totalAmount;
  },
};
</script>
<template>
  <div class="partStock">
    <div class="stockData">
      <div class="form-group">
        <label>Dostępne sztuki</label>
        <input type="text" v-model="totalAmount" disabled />
      </div>
    </div>
    <table>
      <tr>
        <th>Lokalizacja</th>
        <th>Ilość</th>
      </tr>
      <!-- <partStockRow
        v-for="(part, key) in this.activePart.warehouse.parts_id"
        :key="key"
      /> -->
    </table>
  </div>
</template>
<style scoped>
.stockData {
  display: flex;
  width: 12%;
}
</style>
