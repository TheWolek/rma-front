<script>
import { mapGetters } from "vuex";
import router from "../../../router";
import store from "../../../store";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onBack() {
      router.go(-1);
    },
    onSave() {},
    toggleStatusModal() {
      if (this.isStatusBtnActive) store.commit("rma/toggleModal_status", true);
    },
    toggleWaybillModal() {
      store.commit("rma/toggleModal_shipment", true);
    },
    toggleWarehouseModal() {},
    onRefresh() {},
  },
  computed: {
    ...mapGetters({
      rmaPage: "rma/getRmaPage",
    }),
    isSaveBtnActive() {
      return false;
    },
    isBeginBtnActive() {
      return false;
    },
    isStatusBtnActive() {
      return ![8, 9].includes(this.rmaPage.status);
    },
  },
};
</script>
<template>
  <div class="actions">
    <div class="actionBtn" id="btn1" @click="onBack">
      <img src="@/assets/back-arrow.png" /> Cofnij
    </div>
    <div
      class="actionBtn"
      id="btn2"
      @click="onSave"
      :class="{ disabled: !isSaveBtnActive }"
    >
      <img src="@/assets/save.svg" /> Zapisz
    </div>
    <div
      class="actionBtn"
      id="btn3"
      @click="toggleStatusModal"
      :class="{ disabled: !isStatusBtnActive }"
    >
      <img src="@/assets/change.svg" /> Status
    </div>
    <div class="actionBtn" id="btn4" @click="toggleWaybillModal">
      <img src="@/assets/box.svg" /> Przesyłka
    </div>
    <div
      class="actionBtn"
      id="btn5"
      @click="toggleWarehouseModal"
      :class="{ disabled: !isBeginBtnActive }"
    >
      <img src="@/assets/gear.svg" /> Rozpoczęcie
    </div>
    <div class="actionBtn" id="btn6" @click="toggleHistoryModal">
      <img src="@/assets/form.svg" /> Dziennik zdarzeń
    </div>
    <div class="actionBtn refreshBtn" id="btn7" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
