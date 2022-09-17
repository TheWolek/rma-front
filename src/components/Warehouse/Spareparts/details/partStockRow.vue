<script>
import { mapState } from "vuex";

import notAvailableShelves from "../../../../utils/notAvailableShelves";

export default {
  props: ["data"],
  computed: {
    ...mapState({
      shelves: (state) => state.items.shelves,
    }),
    getShelveName() {
      return this.shelves.find((o) => o.shelve_id === this.data.shelve).code;
    },
    // isStockLow() {
    //   if (this.data.amount < 3) return true;
    //   else return false;
    // },
    isShelveAvailable() {
      for (let i = 0; i < notAvailableShelves.length; i++) {
        if (this.getShelveName.match(notAvailableShelves[i])) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>
<template>
  <tr :id="data.sn" :class="{ notAvailable: !this.isShelveAvailable }">
    <td>
      {{ getShelveName }}
    </td>
    <td>{{ data.sn }}</td>
  </tr>
</template>
<style scoped>
td.lowStock {
  font-weight: bold;
  color: var(--vt-c-orange);
}

tr.notAvailable {
  background: var(--vt-c-gray);
}

tr.notAvailable:hover {
  cursor: not-allowed;
}
</style>
