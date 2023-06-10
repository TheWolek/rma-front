<script>
import checkbox from "./checkbox.vue";

export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabledAll: {
      type: Boolean,
      required: false,
    },
  },
  components: { checkbox },
  methods: {
    check(optionId, checked) {
      let updatedValue = [...this.value];
      if (checked) {
        updatedValue.push(optionId);
      } else {
        updatedValue.splice(updatedValue.indexOf(optionId), 1);
      }
      this.$emit("update:value", updatedValue);
    },
  },
};
</script>
<template>
  <div class="checkbox-group">
    <checkbox
      v-for="option in options"
      :fieldId="option.id"
      :label="option.name"
      :key="option"
      :checked="value.includes(option.id)"
      :disabled="disabledAll"
      @update:checked="check(option.id, $event)"
    />
  </div>
</template>
<style scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  background: #eee;
  width: 90%;
  border: 1px solid var(--vt-c-black-mute);
}
</style>
