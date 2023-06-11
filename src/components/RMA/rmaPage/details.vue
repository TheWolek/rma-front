<script>
import waybillTable from "./waybillTable.vue";
import diagnoseSection from "./diagnoseSection.vue";
import ownerDataSection from "./ownerDataSection.vue";
import shipmentDataSection from "./shipmentDataSection.vue";
import deviceSection from "./deviceSection.vue";
import DeviceSection from "./deviceSection.vue";
import process_commentForm from "./modals/process_commentForm.vue";
import process_commentList from "./modals/process_commentList.vue";
import { mapGetters } from "vuex";
import Process_commentList from "./modals/process_commentList.vue";

export default {
  components: {
    waybillTable,
    diagnoseSection,
    ownerDataSection,
    shipmentDataSection,
    deviceSection,
    DeviceSection,
    process_commentForm,
    process_commentList,
    Process_commentList,
  },
  computed: {
    ...mapGetters({
      editMode: "rmaPage/getRmaPageEditMode",
      getComments: "rmaPage/getComments",
    }),
  },
};
</script>
<template>
  <DeviceSection />
  <diagnoseSection />
  <ownerDataSection />
  <shipmentDataSection />
  <div class="comments">
    <h2>Ustalenia do zgłoszenia</h2>
    <process_commentForm :disabled="!editMode" />
    <div class="commentsList">
      <Process_commentList :comments="getComments" />
    </div>
  </div>
  <div class="waybills">
    <h2>Historia listów przewozowych</h2>
    <div class="wrap">
      <waybillTable />
    </div>
  </div>
</template>
<style>
.commentsList {
  margin-left: 1.7em;
}

.device {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding-left: 0.5em;
}

.device h3 {
  padding: 0;
}

.issueWrap {
  padding: 0.5em;
  display: flex;
  gap: 0.6em;
}

.register,
.shelve {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.register .actionBtn,
.shelve .actionBtn {
  width: fit-content;
}

textarea:disabled {
  background-color: rgb(248, 248, 248);
}

.owner .wrap,
.shipment .wrap,
.waybills .wrap {
  margin-left: 0.6em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
</style>
