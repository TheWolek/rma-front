<script>
import { mapState } from "vuex";
import store from "../../../store";
import fetchSubmit from "./handleSubmit";
import bigModal from "../../../parts/bigModal.vue";

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
  components: { bigModal },
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
      <div class="form-group">
        <label for="category">Kategoria</label>
        <div>
          <input type="text" v-model="category" />
          <p id="error_category" class="error_modal_form">
            {{ this.error_category }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="producer">Producent</label>
        <div>
          <input type="text" v-model="producer" />
          <p id="error_producer" class="error_modal_form">
            {{ this.error_producer }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="name">Nazwa</label>
        <div>
          <input type="text" v-model="name" />
          <p id="error_name" class="error_modal_form">
            {{ this.error_name }}
          </p>
        </div>
      </div>
      <input type="submit" value="Szukaj" />
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
<style scoped>
.form-group {
  width: 100%;
}
</style>
