<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    error: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    options: Array,
  },
  data() {
    return {
      model: [],
    };
  },
  methods: {
    onChange(event) {
      this.$emit(
        "input",
        this.model.some((v) => v)
      );
      this.$emit("update:modelValue", this.model);
    },
  },
};
</script>
<template>
  <div class="form-group-wrap">
    <div class="checkbox-group">
      <label :for="atype.id" class="checkbox-tile" v-for="atype in options">
        <p>{{ atype.name }}</p>
        <input
          type="checkbox"
          :name="name"
          :id="atype.id"
          :value="atype.id"
          @change="onChange"
          v-model="model"
        />
      </label>
    </div>
    <p class="error" :class="{ active: this.error !== '' }">
      {{ error }}
    </p>
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

.checkbox-tile {
  padding: 0.4em 1em;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.checkbox-tile:nth-of-type(even) {
  background: #fff;
}

.checkbox-tile input {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
