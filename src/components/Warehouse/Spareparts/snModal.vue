<script>
import { mapState } from "vuex";
import store from "../../../store";
import fetchSubmit from "./handleSubmit";
import bigModal from "../../../parts/bigModal.vue";
import textInput from "../../../parts/inputs/textInput.vue";
import submitButton from "../../../parts/buttons/submitButton.vue";

export default {
  data() {
    return {
      barcode: "",
      error_barcode: "",
      error_form: "",
      error_formActive: false,
    };
  },
  components: { bigModal, textInput, submitButton },
  extends: fetchSubmit,
  computed: {
    ...mapState({
      snModalActive: (state) => state.spareparts.snModalActive,
    }),
  },
  methods: {
    toggleModal() {
      store.commit("spareparts/toggleSnModal", false);
    },
    handleSubmit() {
      this.$router.push({
        name: "sparepartsPartSn",
        query: { code: this.barcode },
      });
      this.handleSubmit_findByCode(this.barcode);
      this.clearForm();
    },
    clearForm() {
      this.barcode = "";
      this.error_barcode = "";
      this.error_form = "";
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.snModalActive"
    :toggleAction="toggleModal"
    modalTitle="Wyszukiwanie części zamiennych"
  >
    <form v-on:submit.prevent="handleSubmit">
      <textInput
        id="barcode"
        label="Kod kreskowy"
        v-model="barcode"
        :error="error_barcode"
      />
      <submitButton label="Szukaj" />
      <p
        id="error_form"
        class="error_modal_form"
        :class="{ active: this.error_formActive }"
      >
        {{ this.error_form }}
      </p>
    </form>
  </bigModal>
</template>
