<script>
import { mapGetters, mapState } from "vuex";
import store from "@/store";

import smallModal from "@/parts/smallModal.vue";
import textInput from "@/parts/inputs/textInput.vue";
import selectInput from "@/parts/inputs/selectInput.vue";
import submitButton from "@/parts/buttons/submitButton.vue";

export default {
  data() {
    return {
      waybill: "",
      type: null,
      error_type: "",
      error_waybill: "",
    };
  },
  components: { smallModal, textInput, selectInput, submitButton },
  computed: {
    ...mapState({
      addWaybillModalActive: (state) => state.rmaWaybills.addWaybillModalActive,
    }),
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
    }),
    incommingActive() {
      return this.rmaPage.status <= 2;
    },
    outcomingActive() {
      return this.rmaPage.status === 8 || this.rmaPage.status === 10;
    },
  },
  methods: {
    toggleModal_addWaybill() {
      store.commit("rmaWaybills/toggleModal_addWaybill", false);
    },
    onSubmit() {
      this.error_type = "";
      this.error_waybill = "";
      if (this.waybill === "") {
        this.error_waybill = "Podaj nr listu";
        return;
      }
      if (this.type === null) {
        this.error_type = "Wybierz typ";
        return;
      }

      store.dispatch("rmaWaybills/addWaybill", {
        ticketId: this.rmaPage.ticket_id,
        waybillNumber: this.waybill,
        type: this.type,
      });
      this.waybill = "";
      this.type = null;
    },
  },
};
</script>
<template>
  <smallModal
    :modalActive="this.addWaybillModalActive"
    :toggleAction="toggleModal_addWaybill"
    modalTitle="Dodawanie nowego listu"
  >
    <form v-on:submit.prevent="onSubmit">
      <textInput
        id="waybill"
        label="Numer listu"
        v-model="waybill"
        :error="error_waybill"
      />
      <selectInput
        id="type"
        label="Typ"
        v-model="type"
        :error="error_type"
        :display="true"
      >
        <option value="null" selected hidden>Wybierz typ</option>
        <option value="przychodzący" :disabled="!incommingActive">
          Przychodzący
        </option>
        <option value="wychodzący" :disabled="!outcomingActive">
          Wychodzący
        </option>
      </selectInput>
      <submitButton label="Zapisz" />
    </form>
  </smallModal>
</template>
