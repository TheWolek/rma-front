<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../store";
import bigModal from "../../../parts/bigModal.vue";
import textInput from "../../../parts/inputs/textInput.vue";
import submitButton from "../../../parts/buttons/submitButton.vue";

import { getUrl, items } from "../../../helpers/endpoints";

export default {
  data() {
    return {
      barcode: "",
      error_barcode: "",
      barcode_reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/,
      sn: "",
      error_sn: "",
      sn_reg: /^[A-z0-9]{3,}$/,
    };
  },
  components: { bigModal, textInput, submitButton },
  mounted() {
    if (this.externalBarcode !== null) {
      this.barcode = this.externalBarcode;
    }
    if (this.externalSn !== null) {
      this.sn = this.externalSn;
    }
  },
  methods: {
    toggleModal() {
      store.commit("items/toggleCreateModal");
      this.error_barcode = "";
    },
    handleSubmit() {
      if (this.barcode == "")
        return this.displayError("podaj kod kreskowy", "barcode");
      if (this.sn == "")
        return this.displayError("podaj kod numer seryjny", "sn");
      if (!this.barcode_reg.test(this.barcode))
        return this.displayError("zły format kodu", "barcode");
      if (!this.sn_reg.test(this.sn))
        return this.displayError("zły format sn", "sn");

      const data = {
        barcode: this.barcode,
        sn: this.sn,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      fetch(getUrl(items), requestOptions)
        .then(async (res) => {
          const resData = await res.json();

          if (!res.ok) {
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }

          if (this.externalBarcode === null) {
            let item = {
              id: resData.id,
              ticket_id: resData.ticket_id,
              name: data.barcode.split("-")[1],
              category: data.barcode.split("-")[2],
              shelve_code: this.shelves[resData.shelve].code,
              shelve: resData.shelve,
              barcode: data.barcode,
            };

            store.dispatch("items/submitModal_Create", item);
          }

          store.dispatch(
            "rmaPage/registerDeviceInWarehouse",
            resData.ticket_id
          );
          this.error_barcode = "";
          this.barcode = "";
          this.toggleModal();
        })
        .catch((error) => {
          return this.displayError(error, "barcode");
        });
    },
    displayError(errMsg, context) {
      if (context === "barcode") {
        this.error_barcode = errMsg;
        document.getElementById("error_barcode").style.opacity = 1;
      }
      if (context === "sn") {
        this.error_sn = errMsg;
        document.getElementById("error_sn").style.opacity = 1;
      }
    },
    hideError(context) {
      if (context === "barcode") {
        document.getElementById("error_barcode").style.opacity = 0;
        this.error_barcode = "";
      }
      if (context === "sn") {
        document.getElementById("error_sn").style.opacity = 0;
        this.error_sn = "";
      }
    },
    onChange() {
      if (this.barcode == "")
        return this.displayError("podaj kod kreskowy", "barcode");
      if (!this.barcode_reg.test(this.barcode)) {
        return this.displayError("zły format kodu", "barcode");
      } else {
        return this.hideError("barcode");
      }
    },
    onChangeSN() {
      if (this.sn === "") return this.displayError("podaj numer seryjny", "sn");
      if (!this.sn_reg.test(this.sn)) {
        return this.displayError("zły format sn", "sn");
      } else {
        return this.hideError("sn");
      }
    },
  },
  computed: {
    ...mapState({
      createModal_Active: (state) => state.items.createModal_Active,
      shelves: (state) => state.items.shelves,
    }),
    ...mapGetters({
      externalBarcode: "items/getCreateModalExternalBarcode",
      externalSn: "items/getcreateModalExternalSn",
    }),
  },
};
</script>
<template>
  <bigModal
    :modalActive="createModal_Active"
    :toggleAction="toggleModal"
    modalTitle="Rejestracja nowego produktu"
  >
    <form v-on:submit.prevent="handleSubmit">
      <textInput
        id="barcode"
        label="Kod kreskowy"
        inputType="text"
        v-model="barcode"
        :change="onChange"
        :error="error_barcode"
      />
      <textInput
        id="sn"
        label="Numer seryjny"
        inputType="text"
        v-model="sn"
        :change="onChangeSN"
        :error="error_sn"
      />
      <submitButton label="Dodaj" />
    </form>
  </bigModal>
</template>
