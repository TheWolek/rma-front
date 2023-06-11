<script>
import { mapGetters } from "vuex";
import router from "../../../router";
import store from "../../../store";
import actionButton from "../../../parts/buttons/actionButton.vue";
import actionButtonRefresh from "../../../parts/buttons/actionButtonRefresh.vue";
import ActionButton from "../../../parts/buttons/actionButton.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    actionButton,
    actionButtonRefresh,
    ActionButton,
  },
  methods: {
    onBack() {
      router.go(-1);
    },
    onSave() {
      if (!this.isSaveBtnActive) return;
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
        damage_type: this.rmaPage.damage_type,
        damage_description: this.rmaPage.damage_description,
        result_type: this.rmaPage.result_type,
        result_description: this.rmaPage.result_description,
      };
      store.dispatch("rmaPage/saveTicketData", body);
    },
    onEdit() {
      if (!this.isEditActive) return;
      if (this.editMode) {
        router.go();
      } else {
        store.commit("rmaPage/setRmaPageEditMode", true);
      }
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
    addWaybillIn() {
      store.commit("rmaPage/toggleModal_shipment", true);
      store.commit("rmaWaybills/toggleModal_addWaybill", true);
    },
    toService() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 2,
      });
    },
    collect() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 3,
      });
    },
    toDiagnose() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 4,
      });
    },
    contact() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 6,
      });
    },
    repair() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 5,
      });
    },
    endRepair() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 8,
      });
    },
    addWaybillOut() {
      store.commit("rmaPage/toggleModal_shipment", true);
      store.commit("rmaWaybills/toggleModal_addWaybill", true);
    },
    send() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 9,
      });
      store.dispatch("items/deleteItemFromWarehouse", {
        barcode: this.barcode,
        shelveId: this.rmaPage.shelve_id,
      });
    },
    sendCanceled() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 11,
      });
      store.dispatch("items/deleteItemFromWarehouse", {
        barcode: this.barcode,
        shelveId: this.rmaPage.shelve_id,
      });
    },
    cancel() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 11,
      });
    },
    toCancel() {
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: 10,
      });
    },
  },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
      apiState: "rmaPage/getApiState",
      rmaAccessories: "rmaAccessories/getAccessories",
      rmaWaybills: "rmaWaybills/getWaybills",
      barcode: "rmaPage/getBarcode",
    }),
    isSaveBtnActive() {
      return this.editMode && this.apiState === 2 ? true : false;
    },
    isProcessBtnActive() {
      if (this.rmaPage.status === 5) return true;
      return false;
    },
    editBtnText() {
      return this.editMode ? "Anuluj edycję" : "Edytuj";
    },
    editBtnIcon() {
      return this.editMode ? "cancel.svg" : "edit.svg";
    },
    isEditActive() {
      if ([9, 11].includes(this.rmaPage.status)) return false;
      return true;
    },
    nextSteps() {
      let output = [];

      //Nowy
      if (this.rmaPage.status === 1) {
        output.push("cancel");

        let waybill = this.rmaWaybills.find((o) => o.type === "przychodzący");
        if (waybill?.status === "potwierdzony") {
          output.push("toService");
        } else {
          output.push("addWaybillIn");
        }
      }

      //Oczekuje na dostarczenie
      if (this.rmaPage.status === 2) {
        output.push("collect");
      }

      //Przyjęto w serwisie
      if (this.rmaPage.status === 3) {
        output.push("toDiagnose");
        output.push("toCancel");
      }

      if (this.rmaPage.status === 4) {
        output.push("repair");
      }

      //W realizacji
      if (this.rmaPage.status === 5) {
        output.push("contact");
        output.push("endRepair");
        output.push("toCancel");
      }

      //Zlecono kontakt
      if (this.rmaPage.status === 6) {
        output.push("repair");
        output.push("toCancel");
      }

      //Przekazano do odesłania
      if (this.rmaPage.status === 8) {
        let waybill = this.rmaWaybills.find((o) => o.type === "wychodzący");
        if (waybill) {
          output.push("send");
        } else {
          output.push("addWaybillOut");
        }
      }

      //Do anulowania
      if (this.rmaPage.status === 10) {
        let waybill = this.rmaWaybills.find((o) => o.type === "wychodzący");
        if (waybill) {
          output.push("sendCanceled");
        } else {
          output.push("addWaybillOut");
        }
      }

      return output;
    },
  },
};
</script>
<template>
  <div class="actions rows">
    <div class="row">
      <actionButton :event="onBack" display="Cofnij" :icon="`back-arrow.png`" />
      <actionButton
        :event="onEdit"
        :display="editBtnText"
        :icon="editBtnIcon"
        :disabled="!isEditActive"
      />
      <actionButton
        :event="onSave"
        display="Zapisz"
        :icon="`save.svg`"
        :disabled="!isSaveBtnActive"
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
    <div class="row" v-if="this.nextSteps.length > 0">
      <ActionButton
        display="Dodaj list (In)"
        :event="addWaybillIn"
        v-if="this.nextSteps.includes('addWaybillIn')"
      />
      <ActionButton
        display="Do serwisu"
        :event="toService"
        v-if="this.nextSteps.includes('toService')"
      />
      <ActionButton
        display="Odbierz"
        :event="collect"
        v-if="this.nextSteps.includes('collect')"
      />
      <ActionButton
        display="Do diagnozy"
        :event="toDiagnose"
        v-if="this.nextSteps.includes('toDiagnose')"
      />
      <ActionButton
        display="Zleć kontakt"
        :event="contact"
        v-if="this.nextSteps.includes('contact')"
      />
      <ActionButton
        display="Naprawa"
        :event="repair"
        v-if="this.nextSteps.includes('repair')"
      />
      <ActionButton
        display="Zakończone"
        :event="endRepair"
        v-if="this.nextSteps.includes('endRepair')"
      />
      <ActionButton
        display="Dodaj list (out)"
        :event="addWaybillOut"
        v-if="this.nextSteps.includes('addWaybillOut')"
      />
      <ActionButton
        display="Wyślij (1)"
        :event="send"
        v-if="this.nextSteps.includes('send')"
      />
      <ActionButton
        display="Wyślij (2)"
        :event="sendCanceled"
        v-if="this.nextSteps.includes('sendCanceled')"
      />
      <ActionButton
        display="Anuluj (1)"
        :event="cancel"
        v-if="this.nextSteps.includes('cancel')"
      />
      <ActionButton
        display="Anuluj (2)"
        :event="toCancel"
        v-if="this.nextSteps.includes('toCancel')"
      />
    </div>
  </div>
</template>
