<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      activePart: (state) => state.spareparts.activePartDetails,
    }),
  },
};
</script>
<template>
  <tr>
    <td>ss</td>
    <td>dff</td>
  </tr>
</template>
