<script>
import { mapState } from "vuex";
import store from "../../../store";
import bigModal from "../../../parts/bigModal.vue";

import handleSubmit from "./handleSubmit";

export default {
  extends: handleSubmit,
  data() {
    return {
      error_barcode_find: "",
      barcode_find: "",
      barcode_reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/,
    };
  },
  components: { bigModal },
  methods: {
    toggleModal_find() {
      //document.getElementById("itemFindModalWrap").classList.toggle("active")
      store.commit("items/toggleFindModal");
      this.error_barcode_find = "";
    },
    displayError(errMsg) {
      this.error_barcode_find = errMsg;
      document.getElementById("error_barcode_find").style.opacity = 1;
    },
    hideError() {
      document.getElementById("error_barcode_find").style.opacity = 0;
      this.error_barcode_find = "";
    },
    onChange_find() {
      if (this.barcode_find == "")
        return this.displayError("podaj kod kreskowy");
      if (!this.barcode_reg.test(this.barcode_find)) {
        return this.displayError("zły format kodu");
      } else {
        return this.hideError();
      }
    },
  },
  computed: {
    ...mapState({
      findModal_Active: (state) => state.items.findModal_Active,
    }),
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.findModal_Active"
    :toggleAction="toggleModal_find"
    modalTitle="Wyszukiwanie produktu po kodzie kreskowym"
  >
    <form v-on:submit.prevent="handleSubmit_find">
      <label for="barcode_find">Kod kreskowy</label>
      <div>
        <input
          type="text"
          id="barcode_find"
          v-model.lazy="barcode_find"
          @change="onChange_find"
        />
        <p id="error_barcode_find" class="error_modal_form">
          {{ this.error_barcode_find }}
        </p>
      </div>
      <input type="submit" value="Szukaj" />
    </form>
  </bigModal>
</template>
