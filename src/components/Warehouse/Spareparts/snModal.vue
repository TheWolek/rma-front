<script>
import { mapState } from "vuex";
import store from "../../../store";

export default {
  data() {
    return {
      barcode: "",
      error_barcode: "",
      error_form: "",
      error_formActive: false,
    };
  },
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
      store.dispatch(
        "spareparts/fetchActivePartDetailsByBarcode",
        this.barcode
      );
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
  <div
    id="sparepartsSnModalWrap"
    class="bigModal"
    :class="{ active: this.snModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Wyszukiwanie części zamiennych</h4>
      </div>
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
    </div>
  </div>
</template>
<style scoped>
.form-group {
  width: 100%;
}
</style>
