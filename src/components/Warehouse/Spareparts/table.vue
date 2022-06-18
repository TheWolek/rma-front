<script>
import row from "./row.vue";
import loadingDots from "../../icons/loadingDots.vue";

import { mapState } from "vuex";

export default {
  components: {
    row,
    loadingDots,
  },
  computed: {
    ...mapState({
      parts: (state) => state.spareparts.parts,
      loading: (state) => state.spareparts.refreshingTable,
    }),
  },
};
</script>
<template>
  <div class="sparepartsTable">
    <div class="tableLoadingWrap" :class="{ active: this.loading }">
      <loadingDots :active="this.loading" />
    </div>
    <table>
      <tr>
        <th></th>
        <th>kategoria</th>
        <th>producent</th>
        <th>model</th>
        <th>wolne sztuki</th>
      </tr>
      <row v-for="part in parts" :key="part.part.cat_id" :rowData="part" />
    </table>
  </div>
</template>
<style scoped>
.sparepartsTable table,
.tableLoadingWrap {
  width: 50%;
}

.sparepartsTable table tr th,
.sparepartsTable table tr td {
  width: 1fr;
}

.sparepartsTable table tr th:nth-child(1),
.sparepartsTable table tr td:nth-child(1) {
  width: 5%;
}

/* .sparepartsTable table tr th:nth-child(1),
.sparepartsTable table tr td:nth-child(1) {
  width: 5%;
}

.sparepartsTable table tr th:nth-child(2),
.sparepartsTable table tr td:nth-child(2) {
  width: 15%;
}

.sparepartsTable table tr th:nth-child(3),
.sparepartsTable table tr td:nth-child(3) {
  width: 25%;
}

.sparepartsTable table tr th:nth-child(4),
.sparepartsTable table tr td:nth-child(4) {
  width: 30%;
}

.sparepartsTable table tr th:nth-child(5),
.sparepartsTable table tr td:nth-child(5) {
  width: 25%;
}

.sparepartsTable table tr th:last-of-type,
.sparepartsTable table tr td:last-of-type {
  width: 7%;
} */
</style>
