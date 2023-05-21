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
      category: "",
      name: "",
      producer: "",
      error_form: "",
      error_category: "",
      error_name: "",
      error_producer: "",
    };
  },
  components: { bigModal, textInput, submitButton },
  extends: fetchSubmit,
  computed: {
    ...mapState({
      findModalActive: (state) => state.spareparts.findModalActive,
    }),
    error_formActive() {
      if (
        this.error_form != "" &&
        (this.category != "" || this.name != "" || this.producer != "")
      ) {
        this.error_form = "";
        return false;
      }
      if (this.error_form == "") return false;
      return true;
    },
  },
  methods: {
    clearData() {
      this.category = "";
      this.name = "";
      this.producer = "";
      this.error_form = "";
      this.error_category = "";
      this.error_producer = "";
      this.error_name = "";
    },
    toggleModal() {
      store.commit("spareparts/toggleFindModal");
    },
    showError(context, error) {
      if (context === "error_form") return (this.error_form = error);
    },
    handleSubmit() {
      if (
        this.category.trim() === "" &&
        (this.name.trim() === "") & (this.producer.trim() === "")
      ) {
        return this.showError(
          "error_form",
          "uzupełnij przynajmniej jedną opcję"
        );
      }

      let query = {};

      if (this.category !== "") query.cat = this.category;
      if (this.producer !== "") query.prod = this.producer;
      if (this.name !== "") query.name = this.name;

      this.$router.push({ path: "/warehouse/spareparts", query: query });
      this.toggleModal();
      this.handleSubmit_find(query);
      this.clearData();
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.findModalActive"
    :toggleAction="toggleModal"
    modalTitle="Wyszukiwanie części zamiennych"
  >
    <form v-on:submit.prevent="handleSubmit">
      <textInput
        id="category"
        label="Kategoria"
        v-model="category"
        :error="error_category"
      />
      <textInput
        id="producer"
        label="Producent"
        v-model="producer"
        :error="error_producer"
      />
      <textInput id="name" label="Nazwa" v-model="name" :error="error_name" />
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
