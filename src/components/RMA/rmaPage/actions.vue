<script>
import { mapGetters, mapMutations } from "vuex";
import router from "../../../router";
import store from "../../../store";
import actionButton from "../../../parts/buttons/actionButton.vue";
import actionButtonRefresh from "../../../parts/buttons/actionButtonRefresh.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    actionButton,
    actionButtonRefresh,
  },
  methods: {
    onBack() {
      router.go(-1);
    },
    onSave() {
      let body = {
        ticketId: this.rmaPage.ticket_id,
        email: this.rmaPage.email,
        lines: this.rmaPage.lines,
        postCode: this.rmaPage.postCode,
        city: this.rmaPage.city,
        type: this.rmaPage.type,
        name: this.rmaPage.name,
        phone: this.rmaPage.phone,
        deviceSn: this.rmaPage.device_sn,
        deviceAccessories: this.rmaAccessories,
        issue: this.rmaPage.issue,
      };
      store.dispatch("rmaPage/saveTicketData", body);
    },
    onEdit() {
      if (this.editMode) {
        router.go();
      } else {
        store.commit("rmaPage/setRmaPageEditMode", true);
      }
    },
    toggleStatusModal() {
      if (this.isStatusBtnActive)
        store.commit("rmaPage/toggleModal_status", true);
    },
    toggleWaybillModal() {
      store.commit("rmaPage/toggleModal_shipment", true);
    },
    toggleProcessModal() {
      if (this.isProcessBtnActive)
        store.dispatch("rmaPage/toggleModal_process", true);
    },
    toggleHistoryModal() {},
    onRefresh() {},
  },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
      apiState: "rmaPage/getApiState",
      rmaAccessories: "rmaAccessories/getAccessories",
    }),
    isSaveBtnActive() {
      return this.editMode && this.apiState === 2 ? true : false;
    },
    isProcessBtnActive() {
      if (this.rmaPage.status === 4) return true;
      return false;
    },
    isStatusBtnActive() {
      return ![8, 9].includes(this.rmaPage.status);
    },
    editBtnText() {
      return this.editMode ? "Anuluj edycję" : "Edytuj";
    },
    editBtnIcon() {
      return this.editMode ? "cancel.svg" : "edit.svg";
    },
  },
};
</script>
<template>
  <div class="actions">
    <actionButton :event="onBack" display="Cofnij" :icon="`back-arrow.png`" />
    <actionButton :event="onEdit" :display="editBtnText" :icon="editBtnIcon" />
    <actionButton
      :event="onSave"
      display="Zapisz"
      :icon="`save.svg`"
      :disabled="!isSaveBtnActive"
    />
    <actionButton
      :event="toggleStatusModal"
      display="Status"
      :icon="`change.svg`"
      :disabled="!isStatusBtnActive"
    />
    <actionButton
      :event="toggleWaybillModal"
      display="Przesyłka"
      :icon="`box.svg`"
    />
    <actionButton
      :event="toggleProcessModal"
      display="Procesuj"
      :icon="`gear.svg`"
      :disabled="!isProcessBtnActive"
    />
    <actionButton
      :event="toggleHistoryModal"
      display="Dziennik zdarzeń"
      :icon="`form.svg`"
    />
    <actionButtonRefresh :event="onRefresh" :loading="this.loading" />
  </div>
</template>
