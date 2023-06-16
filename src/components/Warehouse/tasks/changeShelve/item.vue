<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<template>
  <li>{{ item.barcode }}</li>
</template>
<style scoped>
li {
  color: var(--vt-c-black-mute);
  padding: 0.2em 0 0.2em 0.4em;
}
</style>
