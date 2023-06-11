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
    error: String,
    min: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    onEnter: {
      type: Function,
      default: null,
    },
    input: Function,
    max: String,
  },
  // props: ["id", "label", "inputType", "modelValue", "change", "error"],
  methods: {
    onChange(event) {
      this.$emit("update:modelValue", event.target.value);
      if (this.change) this.change();
    },
    onInput(event) {
      if (this.input) {
        this.$emit("update:modelValue", event.target.value);
        this.input();
      }
    },
  },
};
</script>
<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div>
      <input
        :type="inputType"
        :id="id"
        :value="modelValue"
        @change="onChange"
        :min="min"
        :disabled="disabled"
        v-on:keyup.enter="onEnter"
        @input="onInput"
        :maxlength="max"
      />
      <p
        :id="`error_${id}`"
        class="error"
        :class="{ active: this.error !== '' }"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
<style scoped></style>
