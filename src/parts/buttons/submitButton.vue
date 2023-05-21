<script>
export default {
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <input type="submit" :value="label" :disabled="disabled" />
</template>
