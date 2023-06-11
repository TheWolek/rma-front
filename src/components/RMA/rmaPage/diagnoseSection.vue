<script>
import { mapGetters } from "vuex";
import selectInput from "@/parts/inputs/selectInput.vue";
import SelectInput from "../../../parts/inputs/selectInput.vue";

export default {
  components: { selectInput, SelectInput },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
      getResultTypes: "rmaDictionaries/getResultTypes",
    }),
    issue: {
      get() {
        return this.rmaPage.issue;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "issue",
          newVaule: value,
        });
      },
    },
    resultType: {
      get() {
        return this.rmaPage.result_type;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "result_type",
          newVaule: value,
        });
      },
    },
    resultDescription: {
      get() {
        return this.rmaPage.result_description;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "result_description",
          newVaule: value,
        });
      },
    },
  },
};
</script>
<template>
  <div class="issue">
    <h2>Diagnoza</h2>
    <div class="issueWrap">
      <textarea
        name="issue"
        id="issue"
        v-model="issue"
        cols="70"
        rows="10"
        :disabled="!this.editMode"
      ></textarea>
    </div>
    <div class="resultWrap" v-if="this.rmaPage.status >= 5">
      <div class="form-group">
        <SelectInput
          id="result_type"
          label="Rezultat zgłoszenia"
          v-model="resultType"
          :options="getResultTypes"
          :disabled="!editMode"
        />
      </div>
      <h3>Opis rezultatu zgłoszenia</h3>
      <textarea
        name="resultDescription"
        id="resultDescription"
        v-model="resultDescription"
        cols="70"
        rows="10"
        :disabled="!this.editMode"
      ></textarea>
    </div>
  </div>
</template>
<style scoped>
.resultWrap {
  padding: 0.5em;
}

.resultWrap h3 {
  margin-top: 8px;
}
</style>
