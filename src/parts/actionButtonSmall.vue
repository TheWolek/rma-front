<script>
export default {
  props: ["event", "display", "icon", "disabled"],
  computed: {
    getIcon() {
      return new URL(`../assets/${this.icon}`, import.meta.url).href;
    },
    isDisabled() {
      return {
        disabled: this.disabled,
      };
    },
  },
};
</script>
<template>
  <div class="actionBtn small" @click="event" :class="isDisabled">
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </div>
</template>
<style scoped>
.actionBtn.small {
  font-size: 0.82rem;
  font-weight: 700;
}

.actionBtn.small img {
  width: 14px;
}

.actionBtn.small:nth-child(1) {
  width: 74px;
}
</style>
