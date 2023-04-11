<script>
import { mapState } from "vuex";
import store from "../../../../store";
import actionButton from "../../../../parts/actionButton.vue";
import bigModal from "../../../../parts/bigModal.vue";

import waybillTable from "../waybillTable.vue";
import editWaybill from "./editWaybill.vue";
import addWaybill from "./addWaybill.vue";

export default {
  computed: {
    ...mapState({
      shipmentModalActive: (state) => state.rma.shipmentModalActive,
      editWaybillModalActive: (state) => state.rma.editWaybillModalActive,
      addWaybillModalActive: (state) => state.rma.addWaybillModalActive,
    }),
  },
  components: { bigModal, actionButton, waybillTable, editWaybill, addWaybill },
  methods: {
    toggleModal_shipment() {
      store.commit("rma/toggleModal_shipment", false);
    },
    toggleModal_addWaybill() {
      store.commit("rma/toggleModal_addWaybill", true);
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
