<script>
import { mapState, mapGetters } from "vuex";
import store from "../../../../store";

export default {
  data() {
    return {
      id: null,
      ticketId: null,
      waybillNumber: null,
      status: null,
      type: null,
    };
  },
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
  <div
    id="editWaybillModal"
    class="smallModal"
    :class="{ active: editWaybillModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleModal_editWaybill"></div>
        <h4>
          Edycja Listu <b>{{ data.waybill_number }}</b>
        </h4>
      </div>
      <form v-on:submit.prevent="onSubmit">
        <label for="waybill">Numer listu</label>
        <div>
          <input type="text" id="waybill" v-model.lazy="waybillNumber" />
        </div>
        <label for="status">Status</label>
        <div>
          <select name="status" id="status" v-model="status">
            <option value="potwierdzony">Potwierdzony</option>
            <option value="odebrany">Odebrany</option>
          </select>
        </div>
        <label for="type">Typ</label>
        <div>
          <select name="type" id="type" v-model="type">
            <option value="przychodzący">Przychodzący</option>
            <option value="wychodzący">Wychodzący</option>
          </select>
        </div>
        <input type="submit" value="Zapisz" />
      </form>
    </div>
  </div>
</template>
