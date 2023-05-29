<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";
import submitButton from "../../../../parts/buttons/submitButton.vue";

export default {
  data() {
    return {
      status: null,
    };
  },
  components: { bigModal, submitButton },
  mounted() {
    this.status = this.rmaPage.status;
  },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      waybills: "rmaWaybills/getWaybills",
    }),
    ...mapState({
      statusModalActive: (state) => state.rmaPage.statusModalActive,
      statuses: (state) => state.rmaMain.statuses,
    }),
    availableStatuses() {
      if (this.waybills.length !== 0 && this.waybills[0].status !== "odebrany")
        return [1, 9];
      if (!this.rmaPage.inWarehouse) return [1, 2, 9];
      if (this.rmaPage.status === 1) return [1, 2, 9];
      if (this.rmaPage.status === 2) return [2, 3, 5, 7, 9];
      if (this.rmaPage.status === 3) return [3, 4, 5, 6, 7, 9];
      if ([4, 5, 6].includes(this.rmaPage.status)) return [4, 5, 6, 7, 9];
      if (!this.waybills.find((o) => o.type === "wychodzący")) return [7, 9];
      if (this.rmaPage.status === 7) return [7, 8, 9];
      return [];
    },
  },
  methods: {
    toggleModal_status() {
      store.commit("rmaPage/toggleModal_status", false);
    },
    onSubmit() {
      if (this.status === this.rmaPage.status) return false;
      store.dispatch("rmaPage/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: this.status,
      });
    },
    getTooltipText(selectedId) {
      if (this.rmaPage.status === 1) {
        return "Należy przyjąć w serwisie";
      }

      if (this.rmaPage.status === 2) {
        if (selectedId === 4 || selectedId === 6)
          return "Należy przekazać do diagnozy";
        if (selectedId === 8) return "Należy przekazać do odesłania";
      }

      if ([3, 4, 5, 6].includes(this.rmaPage.status)) {
        if (selectedId === 8) return "Należy przekazać do odesłania";
      }
      if (this.rmaPage.status === 7) {
        if (selectedId === 8) return "Należy dodać list przewozowy";
      }

      return "Nie można cofać statusu";
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.statusModalActive"
    :toggleAction="toggleModal_status"
    modalTitle="Zmiana statusu zlecenia"
  >
    <form v-on:submit.prevent="onSubmit">
      <label
        v-for="s in statuses"
        :for="'status_' + s.id"
        class="radioBtn"
        :class="{
          active: s.id === rmaPage.status,
          disabled: !availableStatuses.includes(s.id),
        }"
      >
        <input
          type="radio"
          name="status"
          :id="'status_' + s.id"
          :value="s.id"
          v-model="status"
          :disabled="!availableStatuses.includes(s.id)"
        />
        <p>{{ s.displayName }}</p>
        <span class="tooltipText" v-if="!availableStatuses.includes(s.id)">{{
          getTooltipText(s.id)
        }}</span>
      </label>
      <submitButton label="Zapisz" />
    </form>
  </bigModal>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}
.radioBtn {
  position: relative;
  display: flex;
  padding: 0.5em;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.radioBtn:hover {
  background-color: var(--vt-c-indigo);
}

.radioBtn.active {
  background-color: rgb(48, 117, 182);
}

.radioBtn .tooltipText {
  visibility: hidden;
  width: 250px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 0.2em 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 105%;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.radioBtn .tooltipText[data-v-55fcf8d0]::after {
  content: "";
  position: absolute;
  top: 12px;
  left: -5px;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555 transparent transparent;
}

.radioBtn:hover .tooltipText {
  visibility: visible;
  opacity: 1;
}

.radioBtn.active p,
.radioBtn.disabled p {
  color: #fff;
}

.radioBtn.disabled {
  background-color: var(--vt-c-black-mute);
  cursor: not-allowed;
}

.radioBtn input {
  width: auto;
}

.radioBtn p {
  margin-left: 0.5em;
}

input[type="submit"] {
  margin-top: 2em;
}
</style>
