<script>
import { mapState } from "vuex";
import store from "../../../../store";

export default {
  mounted() {},
  computed: {
    ...mapState({
      activePart: (state) => state.spareparts.activePartDetails,
    }),
  },
};
</script>
<template>
  <div>sdsadsa</div>
</template>
