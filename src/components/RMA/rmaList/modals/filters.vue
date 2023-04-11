<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";

export default {
  data() {
    return {
      ticketId: null,
      status: null,
      type: null,
      sn: null,
      producer: null,
      waybill: null,
      error_form: "",
    };
  },
  components: { bigModal },
  mounted() {
    if (this.getActiveFilters.length !== 0) {
      this.getActiveFilters.forEach((f) => {
        if (f.name === "zgłoszenie") this.ticketId = f.value;
        if (f.name === "status") this.status = f.value;
        if (f.name === "typ") this.type = f.value;
        if (f.name === "sn") this.sn = f.value;
        if (f.name === "producent") this.producer = f.value;
        if (f.name === "list") this.waybill = f.value;
      });
    }
  },
  computed: {
    ...mapState({
      filtersModalActive: (state) => state.rma.filtersModalActive,
      statuses: (state) => state.rma.statuses,
    }),
    ...mapGetters({
      getActiveFilters: "rma/getActiveFilters",
    }),
  },
  methods: {
    clearData() {
      this.ticketId = null;
      this.status = null;
      this.type = null;
      this.sn = null;
      this.producer = null;
      this.waybill = null;
      this.error_form = "";
    },
    toggleModal_filters() {
      store.commit("rma/toggleModal_filters", false);
      this.clearData();
    },
    displayError(error) {
      this.error_form = error;
    },
    onSubmit() {
      const filters = [];

      if (this.ticketId !== null && this.ticketId !== "")
        filters.push({ name: "zgłoszenie", value: this.ticketId });

      if (this.waybill !== null && this.waybill !== "")
        filters.push({ name: "list", value: this.waybill });

      if (this.status !== null)
        filters.push({ name: "status", value: this.status });

      if (this.type !== null) filters.push({ name: "typ", value: this.type });

      if (this.sn !== null && this.sn !== "")
        filters.push({ name: "SN", value: this.sn });

      if (this.producer !== null && this.producer !== "")
        filters.push({ name: "producent", value: this.producer });

      if (filters.length !== 0) {
        store.dispatch("rma/applyFilters", filters);
        this.toggleModal_filters();
        this.clearData();
      } else {
        this.displayError("Podaj przynajmniej jeden filtr");
      }
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.filtersModalActive"
    :toggleAction="toggleModal_filters"
    modalTitle="Filtry wyszukiwania zgłoszenia serwisowego"
  >
    <form v-on:submit.prevent="onSubmit">
      <label for="ticketId">Numer zgłoszenia</label>
      <div>
        <input type="number" id="ticketId" v-model.lazy="ticketId" />
      </div>
      <label for="waybill">Numer listu przewozowego</label>
      <div>
        <input type="text" id="waybill" v-model.lazy="waybill" />
      </div>
      <label for="status">Status zgłoszenia</label>
      <div>
        <select id="status" v-model.lazy="status">
          <option value="null" selected disabled hidden>Wybierz status</option>
          <option v-for="status in statuses" :value="status.id">
            {{ status.displayName }}
          </option>
        </select>
      </div>
      <label for="type">Typ zgłoszenia</label>
      <div>
        <select id="type" v-model.lazy="type">
          <option value="null" selected disabled hidden>Wybierz typ</option>
          <option value="1">gwarancja</option>
          <option value="2">płatne</option>
        </select>
      </div>
      <label for="sn">Numer seryjny</label>
      <div>
        <input type="text" id="sn" v-model.lazy="sn" />
      </div>
      <label for="producer">Producent</label>
      <div>
        <input type="text" id="producer" v-model.lazy="producer" />
      </div>
      <p class="error" :class="{ active: error_form !== '' }">
        {{ this.error_form }}
      </p>
      <input type="submit" value="zastosuj" />
    </form>
  </bigModal>
</template>
<style scoped>
p.error {
  opacity: 0;
  line-height: 20px;
  height: 20px;
  font-size: 13px;
  color: red;
}

p.error.active {
  opacity: 1;
}
</style>
