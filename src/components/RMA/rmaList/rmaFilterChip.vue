<script>
export default {
  props: ["data"],
  methods: {
    deleteFilter() {},
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
      {{ data.value }}
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
