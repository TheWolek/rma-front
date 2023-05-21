<script>
export default {
  props: {
    id: String,
    label: String,
    inputType: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      required: true,
    },
    change: Function,
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  // props: ["id", "label", "inputType", "modelValue", "change", "error"],
  methods: {
    onChange(event) {
      this.$emit("update:modelValue", event.target.value);
      if (this.change) this.change();
    },
  },
};
</script>
<template>
  <div class="inlineEdit">
    <label :for="id">{{ label }}</label>
    <div>
      <input
        :type="inputType"
        :id="id"
        :value="modelValue"
        @change="onChange"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
<style scoped>
label {
  color: var(--vt-c-black-mute);
}
</style>
