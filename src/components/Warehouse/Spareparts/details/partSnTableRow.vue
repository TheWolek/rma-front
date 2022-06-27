<script>
import { mapState } from "vuex";

export default {
  props: ["rowData"],
  computed: {
    ...mapState({
      shelves: (state) => state.items.shelves,
    }),
    getShelveName() {
      return this.shelves.find((o) => o.shelve_id === this.rowData.shelve).code;
    },
  },
};
</script>
<template>
  <tr>
    <td>{{ getShelveName }}</td>
    <td>{{ rowData.codes }}</td>
  </tr>
</template>
