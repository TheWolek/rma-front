<script>
import { mapGetters } from "vuex";
import formatDateAndHours from "@/utils/formatDateAndHours";

export default {
  computed: {
    ...mapGetters({
      details: "collectPackages/getCollectDetails",
    }),
    getDate() {
      return formatDateAndHours(this.details.created);
    },
    isClosed() {
      return this.details.status === "Odebrany" ? true : false;
    },
  },
};
</script>
<template>
  <div class="details">
    <h1>Odbiór paczek: {{ details.ref_name }} #{{ details.id }}</h1>
    <p>Utworzone: {{ getDate }}</p>
    <h3 v-if="isClosed">
      <b>{{ details.status }}</b>
    </h3>
  </div>
</template>
<style scoped>
.actionBtn {
  width: fit-content;
}
</style>
