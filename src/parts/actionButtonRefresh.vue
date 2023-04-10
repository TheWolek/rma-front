<script>
export default {
  props: ["event", "loading"],
};
</script>
<template>
  <div class="actionBtn refreshBtn" @click="event">
    <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
  </div>
</template>
<style scoped></style>
