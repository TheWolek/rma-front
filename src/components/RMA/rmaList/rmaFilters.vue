<script>
import { mapState } from "vuex";
import store from "../../../store";

import rmaFilterChip from "./rmaFilterChip.vue";

export default {
  components: { rmaFilterChip },
  computed: {
    ...mapState({
      appliedFilter: (state) => state.rmaList.appliedFilter,
    }),
  },
  methods: {
    clearAllFilters() {
      store.commit("rmaList/clearAllFilters");
    },
  },
};
</script>
<template>
  <div>
    <div class="filterWrap" :class="{ active: this.appliedFilter.active }">
      <div
        class="filterChip"
        @click="clearAllFilters"
        v-if="appliedFilter.active"
      >
        Wyczyść wszystkie
        <img src="@/assets/cancel.svg" />
      </div>
      <rmaFilterChip
        v-for="filter in appliedFilter.filters"
        :data="{ name: filter.name, value: filter.value }"
      />
    </div>
  </div>
</template>
<style scoped>
.filterWrap {
  opacity: 1;
}
</style>
