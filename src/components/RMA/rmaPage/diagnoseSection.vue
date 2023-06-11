<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
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
  </div>
</template>
