<script>
import { mapState } from "vuex";
import store from "../../../store";

export default {
  computed: {
    ...mapState({
      appliedFilters: (state) => state.spareparts.appliedFilters,
    }),
  },
  methods: {
    deleteFilter(filter) {
      let newQuery = { ...this.$route.query };
      if (filter === "category") delete newQuery.cat;
      if (filter === "producer") delete newQuery.prod;
      if (filter === "name") delete newQuery.name;
      this.$router.push({
        path: this.$route.path,
        query: newQuery,
      });
      store.dispatch("spareparts/deleteFilter", filter);
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
        <p>{{ val }}</p>
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
