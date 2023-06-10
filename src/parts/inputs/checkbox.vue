<template>
  <label
    :for="fieldId"
    class="checkbox-tile"
    :class="{ disabled: this.disabled }"
  >
    <p>{{ label }}</p>
    <input
      @input="(event) => $emit('update:checked', event.target.checked)"
      type="checkbox"
      :checked="checked"
      :id="fieldId"
      :disabled="disabled"
  /></label>
</template>

<script>
export default {
  props: {
    label: String,
    fieldId: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.checkbox-tile {
  padding: 0.4em 1em;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.checkbox-tile.disabled {
  cursor: default;
}

.checkbox-tile:nth-of-type(even) {
  background: #fff;
}

.checkbox-tile input {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.checkbox-tile input:disabled {
  cursor: default;
}
</style>
