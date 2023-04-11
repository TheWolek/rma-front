<script>
import { mapState } from "vuex";
import store from "../../../store";
import bigModal from "../../../parts/bigModal.vue";

import handleSubmit from "./handleSubmit";

export default {
  extends: handleSubmit,
  data() {
    return {
      shelve_code: "",
      error_shelveCode: "",
      code_reg: /^([A-Z]){1,}_([A-Z]){1,}_([0-9]){1,}$/,
    };
  },
  components: { bigModal },
  methods: {
    toggleModal_shelveFind() {
      //document.getElementById("itemShelveFindModalWrap").classList.toggle("active")
      store.commit("items/toggleShelveFindModal");
      this.error_shelveCode = "";
    },
    displayError(errMsg) {
      this.error_shelveCode = errMsg;
      document.getElementById("error_shelveCode").style.opacity = 1;
    },
    hideError() {
      document.getElementById("error_shelveCode").style.opacity = 0;
      this.error_shelveCode = "";
    },
    onChange_shelveCode() {
      if (this.shelve_code == "")
        return this.displayError("podaj kod lokalizacji");
      if (!this.code_reg.test(this.shelve_code)) {
        return this.displayError("zły format kodu");
      } else {
        return this.hideError();
      }
    },
  },
  computed: {
    ...mapState({
      itemShelveFindModal_Active: (state) =>
        state.items.itemShelveFindModal_Active,
      shelves: (state) => state.items.shelves,
    }),
  },
};
</script>
<template>
  <bigModal
    :modalActive="itemShelveFindModal_Active"
    :toggleAction="toggleModal_shelveFind"
    modalTitle="Wyszukiwanie produktów w lokalizacji"
  >
    <form v-on:submit.prevent="handleSubmit_shelveFind">
      <label for="shelveCode">Kod lokalizacji</label>
      <div>
        <input
          type="text"
          id="shelveCode"
          v-model.lazy="shelve_code"
          @change="onChange_shelveCode"
        />
        <p id="error_shelveCode" class="error_modal_form">
          {{ this.error_shelveCode }}
        </p>
      </div>
      <input type="submit" value="Szukaj" />
    </form>
  </bigModal>
</template>
