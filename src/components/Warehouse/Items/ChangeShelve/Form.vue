<script>
import ChangeShelveTable from "./Table.vue";
import { mapState } from "vuex";
import textInput from "../../../../parts/inputs/textInput.vue";

export default {
  components: { ChangeShelveTable, textInput },
  data() {
    return {
      activeShelve: "",
      newShelve: "",
    };
  },
  mounted() {
    if (this.form_active.status) {
      this.activeShelve = this.form_active.active;
      this.newShelve = this.form_active.new;
    }
  },
  computed: {
    ...mapState({
      form_active: (state) => state.changeShelve.form_active,
    }),
  },
  watch: {
    form_active(status) {
      if (status.status) {
        this.activeShelve = status.active;
        this.newShelve = status.new;
      } else {
        this.activeShelve = "";
        this.newShelve = "";
      }
    },
  },
};
</script>
<template>
  <form id="changeShelveForm" v-on:submit.prevent="handleSubmit">
    <div class="topBar">
      <textInput
        id="activeShelve"
        label="Bierząca lokalizacja"
        v-model="activeShelve"
        :disabled="true"
      />
      <textInput
        id="newShelve"
        label="Nowa lokalizacja"
        v-model="newShelve"
        :disabled="true"
      />
    </div>
    <div class="tableWrap">
      <ChangeShelveTable />
    </div>
  </form>
</template>
<style scoped>
form#changeShelveForm {
  padding: 0;
  width: 90%;
}
</style>
