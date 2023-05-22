<script>
import { mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";
import textInput from "../../../../parts/inputs/textInput.vue";
import submitButton from "../../../../parts/buttons/submitButton.vue";

export default {
  data() {
    return {
      active_code: "",
      error_active_code: "",
      new_code: "",
      error_new_code: "",
      code_reg: /^([A-Z]){1,}_([A-Z]){1,}_([0-9]){1,}$/,
      modal_active: false,
    };
  },
  components: { bigModal, textInput, submitButton },
  computed: {
    ...mapState({
      isModalActive: (state) => state.changeShelve.modal_active,
      modalData: (state) => state.changeShelve.modalData,
      shelves: (state) => state.items.shelves,
    }),
  },
  watch: {
    isModalActive(status) {
      this.modal_active = status;
    },
    modalData(status) {
      this.active_code = status;
    },
  },
  methods: {
    toggleModal() {
      store.commit("changeShelve/toggleModal");
      this.error_active_code = "";
      this.error_new_code = "";
    },
    displayError(errMsg, context) {
      if (context == "active_code") this.error_active_code = errMsg;
      if (context == "new_code") this.error_new_code = errMsg;
      document.getElementById("error_" + context).style.opacity = 1;
    },
    hideError(context) {
      if (context == "new_code") {
        document.getElementById("error_new_code").style.opacity = 0;
        this.error_new_code = "";
      } else {
        document.getElementById("error_active_code").style.opacity = 0;
        this.error_active_code = "";
      }
    },
    active_onChange() {
      if (this.active_code == "")
        return this.displayError("podaj kod lokalizacji", "active_code");
      if (!this.code_reg.test(this.active_code)) {
        return this.displayError("zły format kodu", "active_code");
      } else {
        return this.hideError("active_code");
      }
    },
    new_onChange() {
      if (this.new_code == "")
        return this.displayError("podaj kod lokalizacji", "new_code");
      if (!this.code_reg.test(this.new_code)) {
        return this.displayError("zły format kodu", "new_code");
      } else {
        return this.hideError("new_code");
      }
    },
    handleSubmit() {
      if (this.active_code == "")
        return this.displayError("podaj kod lokalizacji", "active_code");
      if (!this.code_reg.test(this.active_code))
        return this.displayError("zły format kodu", "active_code");

      if (this.new_code == "")
        return this.displayError("podaj kod lokalizacji", "new_code");
      if (!this.code_reg.test(this.new_code))
        return this.displayError("zły format kodu", "new_code");

      let acive_find = this.shelves.find((o) => o.code == this.active_code);
      let new_find = this.shelves.find((o) => o.code == this.new_code);
      if (acive_find == undefined)
        return this.displayError(
          "podana lokalizacja nie istnieje",
          "active_code"
        );
      if (new_find == undefined)
        return this.displayError("podana lokalizacja nie istnieje", "new_code");

      if (this.active_code == this.new_code)
        return this.displayError(
          "nowa lokalizacja nie może być identyczna jak obecna",
          "new_code"
        );

      store.commit("changeShelve/toggleFormStatus", {
        status: true,
        active: this.active_code,
        new: this.new_code,
      });
      this.toggleModal();
      this.active_code = "";
      this.error_active_code = "";
      this.new_code = "";
      this.error_new_code = "";
    },
  },
  mounted() {
    this.emitter.on("changeShelve_modal_toggle", () => {
      this.toggleModal();
    });
    store.dispatch("items/fetchAllShelves");
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.modal_active"
    :toggleAction="toggleModal"
    modalTitle="Zmiana lokalizacji produktu"
  >
    <form v-on:submit.prevent="handleSubmit">
      <textInput
        id="active_code"
        label="Kod bieżącej lokalizacji"
        v-model="active_code"
        :change="active_onChange"
        :error="error_active_code"
      />
      <textInput
        id="new_code"
        label="Kod nowej lokalizacji"
        v-model="new_code"
        :change="new_onChange"
        :error="error_new_code"
      />
      <submitButton label="Dodaj" />
    </form>
  </bigModal>
</template>
