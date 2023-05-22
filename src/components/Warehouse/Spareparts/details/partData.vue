<script>
import { mapGetters, mapState } from "vuex";
import textInput from "../../../../parts/inputs/textInput.vue";

export default {
  data() {
    return {};
  },
  components: { textInput },
  computed: {
    ...mapState({
      activePart: (state) => state.spareparts.activePartDetails,
    }),
  },
};
</script>
<template>
  <div class="partData">
    <textInput
      id="cat"
      label="Kategoria"
      v-model="activePart.part.category"
      :disabled="true"
    />
    <textInput
      id="producer"
      label="Producent"
      v-model="activePart.part.producer"
      :disabled="true"
    />
    <textInput
      id="name"
      label="Model"
      v-model="activePart.part.name"
      :disabled="true"
    />
  </div>
</template>
<style scoped>
.partData {
  display: flex;
  gap: 0.8em;
  padding: 0.25em 2em 2em 2em;
}
</style>
