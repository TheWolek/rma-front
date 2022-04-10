<script>
import { mapState } from "vuex";
import store from "../../../store";

import handleSubmit_find from "./handleSubmit_find";

export default {
  extends: handleSubmit_find,
  data() {
    return {
      error_barcode_find: "",
      barcode_find: "",
    };
  },
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
  <div
    id="itemFindModalWrap"
    class="bigModal"
    :class="{ active: this.findModal_Active }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal_find"></div>
        <h4>Wyszukiwanie produktu po kodzie kreskowym</h4>
      </div>
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
    </div>
  </div>
</template>
