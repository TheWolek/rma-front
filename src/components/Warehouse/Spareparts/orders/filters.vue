<script>
import { mapState } from "vuex";
import store from "../../../../store";
export default {
  computed: {
    ...mapState({
      appliedFilters: (state) => state.sparepartsOrders.appliedFilters,
    }),
  },
  methods: {
    deleteFilter(filter) {
      store.dispatch("sparepartsOrders/deleteFilter", filter);
    },
  },
};
</script>
<template>
  <div>
    <div class="filterWrap" :class="{ active: this.appliedFilters.active }">
      <div
        v-for="(val, key) in appliedFilters.names"
        :key="key"
        class="filterChip"
        @click="
          () => {
            deleteFilter(key);
          }
        "
      >
        <p>{{ val[0] }}</p>
        <img src="@/assets/cancel.svg" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.filterWrap {
  height: 23px;
}
</style>
