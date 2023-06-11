<script>
import { mapGetters, mapState } from "vuex";
import store from "@/store";
import actionButton from "@/parts/buttons/actionButton.vue";
import bigModal from "@/parts/bigModal.vue";

import waybillTable from "../waybillTable.vue";
import editWaybill from "./editWaybill.vue";
import addWaybill from "./addWaybill.vue";

export default {
  computed: {
    ...mapState({
      shipmentModalActive: (state) => state.rmaPage.shipmentModalActive,
      editWaybillModalActive: (state) =>
        state.rmaWaybills.editWaybillModalActive,
      addWaybillModalActive: (state) => state.rmaWaybills.addWaybillModalActive,
    }),
    ...mapGetters({
      getWaybills: "rmaWaybills/getWaybills",
      rmaPage: "rmaPage/getRmaPage",
    }),
    isAddActive() {
      let waybillsIn = this.getWaybills.filter(
        (o) => o.type === "przychodzący"
      );
      let waybillsOut = this.getWaybills.filter((o) => o.type === "wychodzący");
      let good = true;

      waybillsIn.forEach((i) => {
        if (i?.status === "potwierdzony") good = false;
      });

      waybillsOut.forEach((i) => {
        if (i?.status === "potwierdzony") good = false;
      });

      if (
        this.rmaPage.status >= 3 &&
        this.rmaPage.status !== 8 &&
        this.rmaPage.status !== 10
      )
        good = false;

      if (this.rmaPage.status === 9 && this.rmaPage.status === 11) good = false;

      return good;
    },
  },
  components: { bigModal, actionButton, waybillTable, editWaybill, addWaybill },
  methods: {
    toggleModal_shipment() {
      store.commit("rmaPage/toggleModal_shipment", false);
    },
    toggleModal_addWaybill() {
      if (!this.isAddActive) return;
      store.commit("rmaWaybills/toggleModal_addWaybill", true);
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.shipmentModalActive"
    :toggleAction="toggleModal_shipment"
    modalTitle="Zarządzanie przesyłkami do zlecenia"
  >
    <editWaybill v-if="editWaybillModalActive" />
    <addWaybill v-if="addWaybillModalActive" />
    <div class="tableWrap">
      <waybillTable withEdit="true" />
      <div class="addBtnWrap">
        <actionButton
          :event="toggleModal_addWaybill"
          display="Dodaj"
          :icon="`add.svg`"
          :disabled="!isAddActive"
        />
      </div>
    </div>
  </bigModal>
</template>
<style scoped>
.tableWrap {
  padding: 0.5em 0.8em;
  width: 100%;
}

table {
  margin: 0;
}

.addBtnWrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
  margin-right: 0.5em;
}
</style>
