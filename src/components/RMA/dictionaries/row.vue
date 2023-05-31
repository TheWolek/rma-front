<script>
import InlineEditInput from "../../../parts/inputs/inlineEditInput.vue";
import store from "../../../store";

export default {
  props: ["row", "type"],
  data() {
    return {
      editMode: false,
      name: this.row.name,
    };
  },
  methods: {
    onClick() {
      if (this.editMode) {
        this.editMode = !this.editMode;
        store.dispatch("rmaDictionaries/editDictionary", {
          dictType: this.type,
          id: this.row.id,
          newValue: this.name,
        });
      } else {
        this.editMode = !this.editMode;
      }
    },
  },
  components: { InlineEditInput },
};
</script>
<template>
  <tr>
    <td>{{ row.id }}</td>
    <td class="right">
      <div class="name" v-if="!editMode">{{ row.name }}</div>
      <InlineEditInput
        :id="row.id"
        v-model="name"
        v-if="editMode"
        :disabled="false"
      />
      <button @click="onClick">
        {{ this.editMode ? "Zapisz" : "Edytuj" }}
      </button>
    </td>
  </tr>
</template>
<style scoped>
td {
  height: 42px;
}
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-right: 1em;
  cursor: pointer;
}
</style>
