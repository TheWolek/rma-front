<script>
import { mapState } from "vuex";
import actions from "@/components/RMA/rmaPage/actions.vue";
import rmaHeader from "@/components/RMA/rmaPage/header.vue";
import rmaDetails from "@/components/RMA/rmaPage/details.vue";
import shipmentModal from "@/components/RMA/rmaPage/modals/shipment.vue";
import itemCreateModal from "@/components/Warehouse/Items/itemCreateModal.vue";
import statusModal from "@/components/RMA/rmaPage/modals/status.vue";
import processModal from "@/components/RMA/rmaPage/modals/process.vue";
import store from "@/store";

export default {
  mounted() {
    store.dispatch("rmaPage/getTicketData", this.$route.params.id);
    store.dispatch(
      "rmaWaybills/fetchWaybillsByTicketId",
      this.$route.params.id
    );
    store.dispatch(
      "rmaAccessories/fetchAccessoriesByTicketId",
      this.$route.params.id
    );
    store.dispatch("rmaPage/fetchCommentsByTicketId", this.$route.params.id);
    store.dispatch("rmaDictionaries/fetchDictionary", "statusesTypes");
    store.dispatch("rmaDictionaries/fetchDictionary", "accessoriesTypes");
    store.dispatch("rmaDictionaries/fetchDictionary", "damageTypes");
    store.dispatch("rmaDictionaries/fetchDictionary", "resultTypes");
  },
  computed: {
    ...mapState({
      apiState: (state) => state.rmaPage.apiState,
      createModal_Active: (state) => state.items.createModal_Active,
      statusModal_Active: (state) => state.rmaPage.statusModalActive,
      processModal_Active: (state) => state.rmaPage.processModalActive,
    }),
    apiState_loaded() {
      return this.apiState === 2;
    },
    apiState_loading() {
      return this.apiState === 0 || this.apiState === 1;
    },
  },
  components: {
    actions,
    rmaHeader,
    rmaDetails,
    shipmentModal,
    itemCreateModal,
    statusModal,
    processModal,
  },
};
</script>
<template>
  <div id="rmaPage">
    <shipmentModal />
    <statusModal v-if="statusModal_Active" />
    <itemCreateModal v-if="createModal_Active" />
    <processModal v-if="processModal_Active" />
    <actions />
    <div class="rmaPage_wrap" v-if="apiState_loaded">
      <rmaHeader />
      <div class="rmaPage_wrap_details">
        <rmaDetails />
      </div>
    </div>
  </div>
</template>
<style>
.rmaPage_wrap {
  padding: 0.5em;
}

.rmaPage_wrap_details {
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.inlineEdit {
  display: grid;
  grid-template-columns: auto 1fr 40px;
  justify-content: flex-start;
  column-gap: 0.5em;
  width: 70%;
}

.inlineEdit input:disabled {
  background: none;
  border: 2px solid transparent;
  cursor: default;
}

.btn {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.btn img {
  width: 100%;
}

textarea {
  resize: none;
}

textarea:disabled {
  cursor: default !important;
}

h1 {
  font-size: 1.3em !important;
}
h2 {
  font-size: 1.1em;
  padding: 0 0 0.5em 0.5em;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5em;
}
h3 {
  font-size: 1em;
  padding: 0 0 0.1em 0.5em;
}

h3.email {
  text-transform: none;
}

h2,
h3,
p {
  color: var(--vt-c-black-mute);
  text-transform: capitalize;
}
</style>
