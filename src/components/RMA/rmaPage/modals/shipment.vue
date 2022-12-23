<script>
import { mapState } from "vuex";
import store from "../../../../store";

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
  components: { waybillTable, editWaybill, addWaybill },
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
  <div
    id="rmaShipmentModalWrap"
    class="bigModal"
    :class="{ active: this.shipmentModalActive }"
  >
    <editWaybill v-if="editWaybillModalActive" />
    <addWaybill v-if="addWaybillModalActive" />
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleModal_shipment"></div>
        <h4>Zarządzanie przesyłkami do zlecenia</h4>
      </div>
      <div class="tableWrap">
        <waybillTable withEdit="true" />
        <div class="addBtnWrap">
          <div class="actionBtn" @click="toggleModal_addWaybill">+ Dodaj</div>
        </div>
      </div>
    </div>
  </div>
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
