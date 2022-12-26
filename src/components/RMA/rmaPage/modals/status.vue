<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";

export default {
  data() {
    return {
      status: null,
    };
  },
  mounted() {
    this.status = this.rmaPage.status;
  },
  computed: {
    ...mapGetters({
      rmaPage: "rma/getRmaPage",
      waybills: "rma/getWaybills",
    }),
    ...mapState({
      statusModalActive: (state) => state.rma.statusModalActive,
      statuses: (state) => state.rma.statuses,
    }),
    availableStatuses() {
      if (this.waybills[0].status !== "odebrany") return [1, 9];
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
      store.commit("rma/toggleModal_status", false);
    },
    onSubmit() {
      if (this.status === this.rmaPage.status) return false;
      store.dispatch("rma/changeTicketStatus", {
        ticketId: this.rmaPage.ticket_id,
        newStatus: this.status,
      });
    },
  },
};
</script>
<template>
  <div
    id="rmaStatusModalWrap"
    class="bigModal"
    :class="{ active: this.statusModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleModal_status"></div>
        <h4>Zmiana statusu zlecenia</h4>
      </div>
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
        </label>
        <input type="submit" value="Zapisz" />
      </form>
    </div>
  </div>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}
.radioBtn {
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
