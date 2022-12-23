<script>
import { mapState } from "vuex";

export default {
  props: ["data"],
  methods: {
    deleteFilter() {},
  },
  computed: {
    ...mapState({
      statuses: (state) => state.rma.statuses,
    }),
    getDisplayName() {
      if (this.data.name === "status") {
        return this.statuses.find((o) => o.id === this.data.value).displayName;
      }
      return this.data.value;
    },
  },
};
</script>
<template>
  <div class="filter">
    <p>{{ data.name }}:</p>
    <div
      class="filterChip"
      @click="
        () => {
          deleteFilter();
        }
      "
    >
      {{ getDisplayName }}
      <img src="@/assets/cancel.svg" />
    </div>
  </div>
</template>
<style scoped>
.filter {
  display: flex;
}

.filter p {
  color: var(--vt-c-black-mute);
  margin-right: 0.6em;
}
</style>
