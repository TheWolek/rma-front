<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      activePart: (state) => state.spareparts.activePartDetails,
    }),
  },
};
</script>
<template>
  <div class="partData">
    <div class="form-group">
      <label>Kategoria</label>
      <input type="text" :value="activePart.part.category" disabled />
    </div>
    <div class="form-group">
      <label>Producent</label>
      <input type="text" :value="activePart.part.producer" disabled />
    </div>
    <div class="form-group">
      <label>Model</label>
      <input type="text" :value="activePart.part.name" disabled />
    </div>
  </div>
</template>
<style scoped>
.partData {
  display: flex;
  gap: 0.8em;
  padding: 0.25em 2em 2em 2em;
}
</style>
