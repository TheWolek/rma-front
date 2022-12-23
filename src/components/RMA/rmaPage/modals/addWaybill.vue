<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";

export default {
  data() {
    return {
      waybill: "",
      type: null,
      erorr_type: "",
    };
  },
  computed: {
    ...mapState({
      addWaybillModalActive: (state) => state.rma.addWaybillModalActive,
    }),
    ...mapGetters({
      rmaPage: "rma/getRmaPage",
    }),
  },
  methods: {
    toggleModal_addWaybill() {
      store.commit("rma/toggleModal_addWaybill", false);
    },
    onSubmit() {
      if (this.type === null) {
        this.erorr_type = "Wybierz typ";
        return;
      }

      this.erorr_type = "";
      store.dispatch("rma/addWaybill", {
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
  <div
    id="addWaybillModal"
    class="smallModal"
    :class="{ active: addWaybillModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleModal_addWaybill"></div>
        <h4>Dodawanie nowego listu</h4>
      </div>
      <form v-on:submit.prevent="onSubmit">
        <label for="waybill">Numer listu</label>
        <div>
          <input type="text" id="waybill" v-model.lazy="waybill" />
        </div>
        <label for="type">Typ</label>
        <div>
          <select name="type" id="type" v-model="type">
            <option value="null" selected hidden>Wybierz typ</option>
            <option value="przychodzący">Przychodzący</option>
            <option value="wychodzący">Wychodzący</option>
          </select>
          <p class="error">{{ erorr_type }}</p>
        </div>
        <input type="submit" value="Zapisz" />
      </form>
    </div>
  </div>
</template>
