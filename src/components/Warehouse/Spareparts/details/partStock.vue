<script>
import { mapState } from "vuex";

import textInput from "../../../../parts/inputs/textInput.vue";
import partStockRow from "./partStockRow.vue";

export default {
  components: { partStockRow, textInput },
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
      <textInput
        id="freeInStock"
        label="Dostępne sztuki"
        v-model="activePart.warehouse.totalAmount"
        :disabled="true"
      />
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
