<script>
export default {
  props: {
    id: String,
    label: String,
    modelValue: {
      type: String,
      required: true,
    },
    change: Function,
    error: String,
    options: Array,
    disabled: {
      type: Boolean,
      default: false,
    },
    display: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(event) {
      this.$emit("update:modelValue", event.target.value);
      if (this.change) this.change();
    },
  },
  computed: {
    // getDisplayName() {
    //   if (this.display) {
    //     let out = "";
    //     this.display.forEach((el) => {
    //       out += `el['${el}'] `;
    //     });
    //     return out;
    //   }
    //   return "";
    // },
  },
};
</script>
<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div>
      <select
        :id="id"
        :value="modelValue"
        @change="onChange"
        :disabled="disabled"
      >
        <option disabled value>{{ label }}</option>
        <slot v-if="this.display"></slot>
        <option
          v-if="!this.display"
          v-for="el in options"
          :key="el.id"
          :value="el.id"
        >
          <span>{{ el.name }}</span>
        </option>
      </select>
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
<style scoped>
select {
  padding: 0.35em;
}
</style>
