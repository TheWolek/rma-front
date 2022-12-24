<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../store";

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

      fetch("http://localhost:3000/warehouse/items", requestOptions)
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

          store.dispatch("rma/registerDeviceInWarehouse", resData.ticket_id);
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
  <div
    id="itemCreateModalWrap"
    class="bigModal"
    :class="{ active: this.createModal_Active }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Rejestracja nowego produktu</h4>
      </div>
      <form v-on:submit.prevent="handleSubmit">
        <label for="barcode">Kod kreskowy</label>
        <div>
          <input
            type="text"
            id="barcode"
            v-model.lazy="barcode"
            @change="onChange"
          />
          <p id="error_barcode" class="error_modal_form">
            {{ this.error_barcode }}
          </p>
        </div>
        <label for="sn">Numer seryjny</label>
        <div>
          <input type="text" id="sn" v-model.lazy="sn" @change="onChangeSN" />
          <p id="error_sn" class="error_modal_form">
            {{ this.error_sn }}
          </p>
        </div>
        <input type="submit" value="Dodaj" />
      </form>
    </div>
  </div>
</template>
