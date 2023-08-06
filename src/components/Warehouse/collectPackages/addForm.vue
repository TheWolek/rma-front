<script>
import { mapGetters } from "vuex";
import textInput from "../../../parts/inputs/textInput.vue";

export default {
  data() {
    return { waybill: "" };
  },
  components: { textInput },
  computed: {
    ...mapGetters({
      details: "collectPackages/getCollectDetails",
    }),
    isClosed() {
      return this.details.status === "Odebrany" ? true : false;
    },
  },
  methods: {
    onSubmit() {
      if (this.waybill === "") return;

      store.dispatch("collectPackages/addNewItemToList", {
        collectId: this.details.id,
        waybill: this.waybill,
      });
      this.waybill = "";
    },
  },
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <textInput
      id="waybillInput"
      label="Numer przesyłki"
      v-model="waybill"
      :onEnter="onSubmit"
      :disabled="isClosed"
    />
  </form>
</template>
<style scoped>
.form-group {
  width: 40%;
}
</style>
