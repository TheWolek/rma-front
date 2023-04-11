<script>
import { mapState } from "vuex";
import store from "../../../store";
import fetchSubmit from "./handleSubmit";
import bigModal from "../../../parts/bigModal.vue";

export default {
  data() {
    return {
      barcode: "",
      error_barcode: "",
      error_form: "",
      error_formActive: false,
    };
  },
  components: { bigModal },
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
      <div class="form-group">
        <label for="category">Kod kreskowy</label>
        <div>
          <input type="text" v-model="barcode" />
          <p id="error_category" class="error_modal_form">
            {{ this.error_barcode }}
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
