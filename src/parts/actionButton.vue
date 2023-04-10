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
  <div class="actionBtn" @click="event" :class="isDisabled">
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </div>
</template>
<style scoped></style>
