<script>
import { mapState } from "vuex";
import store from "../../../../store";

import waybillTable from "../waybillTable.vue";
import editWaybill from "./editWaybill.vue";

export default {
  computed: {
    ...mapState({
      shipmentModalActive: (state) => state.rma.shipmentModalActive,
      editWaybillModalActive: (state) => state.rma.editWaybillModalActive,
    }),
  },
  components: { waybillTable, editWaybill },
  methods: {
    toggleModal_shipment() {
      store.commit("rma/toggleModal_shipment", false);
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
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleModal_shipment"></div>
        <h4>Zarządzanie przesyłkami do zlecenia</h4>
      </div>
      <div class="tableWrap">
        <waybillTable withEdit="true" />
        <div class="addBtnWrap">
          <div class="actionBtn">+ Dodaj</div>
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
