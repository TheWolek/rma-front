<script>
import { mapGetters } from "vuex";
import textInput from "../../../../parts/inputs/textInput.vue";
import actionButton from "../../../../parts/buttons/actionButton.vue";
import store from "../../../../store";

export default {
  components: { textInput, actionButton },
  computed: {
    ...mapGetters({
      getFilters: "collectPackages/getFilters",
    }),
    refName: {
      get() {
        return this.getFilters.refName;
      },
      set(value) {
        let newValue = this.getFilters;
        newValue.refName = value;
        store.commit("collectPackages/setFilters", newValue);
      },
    },
  },
  methods: {
    onSubmit() {
      store.dispatch("collectPackages/fetchList", this.getFilters);
    },
  },
};
</script>
<template>
  <div class="filters">
    <textInput id="refName" label="Numer zbiorczy" v-model="refName" />
    <actionButton display="Szukaj" :event="onSubmit" />
  </div>
</template>
<style scoped>
.actionBtn {
  width: fit-content;
}
</style>
