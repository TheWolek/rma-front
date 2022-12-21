<script>
import { mapState } from "vuex";
import store from "../../../store";

import rmaFilterChip from "./rmaFilterChip.vue";

export default {
  components: { rmaFilterChip },
  computed: {
    ...mapState({
      appliedFilter: (state) => state.rma.appliedFilter,
    }),
  },
};
</script>
<template>
  <div>
    <div class="filterWrap" :class="{ active: this.appliedFilter.active }">
      <rmaFilterChip
        v-for="(value, name) in appliedFilter.filters"
        :data="{ name: name, value: value }"
      />
    </div>
  </div>
</template>
<style scoped></style>
