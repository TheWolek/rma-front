<script>
import { mapState, mapGetters } from "vuex";
import store from "../../../../store";

import smallModal from "../../../../parts/smallModal.vue";
import textInput from "../../../../parts/inputs/textInput.vue";
import submitButton from "../../../../parts/buttons/submitButton.vue";
import selectInput from "../../../../parts/inputs/selectInput.vue";

export default {
  data() {
    return {
      id: null,
      ticketId: null,
      waybillNumber: null,
      status: null,
      type: null,
      error_waybill: "",
    };
  },
  components: { smallModal, textInput, submitButton, selectInput },
  mounted() {
    this.id = this.data.id;
    this.ticketId = this.data.ticket_id;
    this.waybillNumber = this.data.waybill_number;
    this.status = this.data.status;
    this.type = this.data.type;
  },
  computed: {
    ...mapState({
      editWaybillModalActive: (state) => state.rma.editWaybillModalActive,
    }),
    ...mapGetters({
      data: "rma/getEditWaybillModalData",
    }),
  },
  methods: {
    toggleModal_editWaybill() {
      store.commit("rma/toggleModal_editWaybill", false);
      store.commit("rma/setEditWaybillModalData", {});
    },
    onSubmit() {
      this.error_waybill = "";
      if (this.waybillNumber === "") {
        this.error_waybill = "Podaj nr listu";
        return;
      }

      store.dispatch("rma/saveWaybillData", {
        id: this.id,
        ticketId: this.ticketId,
        waybillNumber: this.waybillNumber,
        status: this.status,
        type: this.type,
      });
    },
  },
};
</script>
<template>
  <smallModal
    :modalActive="this.editWaybillModalActive"
    :toggleAction="toggleModal_editWaybill"
    modalTitle="Edycja listu"
  >
    <form v-on:submit.prevent="onSubmit">
      <textInput
        id="waybill"
        label="Numer listu"
        v-model="waybillNumber"
        :error="error_waybill"
      />

      <selectInput id="status" label="Status" v-model="status" :display="true">
        <option value="potwierdzony">Potwierdzony</option>
        <option value="odebrany">Odebrany</option>
        <option value="anulowany">Anulowany</option>
      </selectInput>

      <selectInput id="type" label="Typ" v-model="type" :display="true">
        <option value="przychodzący">Przychodzący</option>
        <option value="wychodzący">Wychodzący</option>
      </selectInput>

      <submitButton label="Zapisz" />
    </form>
  </smallModal>
</template>
