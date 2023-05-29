<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";
import textInput from "../../../../parts/inputs/textInput.vue";
import selectInput from "../../../../parts/inputs/selectInput.vue";
import submitButton from "../../../../parts/buttons/submitButton.vue";

export default {
  data() {
    return {
      ticketId: "",
      status: "",
      type: "",
      sn: "",
      producer: "",
      waybill: "",
      error_form: "",
    };
  },
  components: { bigModal, textInput, selectInput, submitButton },
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
      filtersModalActive: (state) => state.rmaList.filtersModalActive,
      statuses: (state) => state.rmaMain.statuses,
    }),
    ...mapGetters({
      getActiveFilters: "rmaList/getActiveFilters",
    }),
  },
  methods: {
    clearData() {
      this.ticketId = "";
      this.status = "";
      this.type = "";
      this.sn = "";
      this.producer = "";
      this.waybill = "";
      this.error_form = "";
    },
    toggleModal_filters() {
      store.commit("rmaList/toggleModal_filters", false);
      this.clearData();
    },
    displayError(error) {
      this.error_form = error;
    },
    onSubmit() {
      const filters = [];

      if (this.ticketId !== "" && this.ticketId !== "")
        filters.push({ name: "zgłoszenie", value: this.ticketId });

      if (this.waybill !== "" && this.waybill !== "")
        filters.push({ name: "list", value: this.waybill });

      if (this.status !== "")
        filters.push({ name: "status", value: this.status });

      if (this.type !== "") filters.push({ name: "typ", value: this.type });

      if (this.sn !== "" && this.sn !== "")
        filters.push({ name: "SN", value: this.sn });

      if (this.producer !== "" && this.producer !== "")
        filters.push({ name: "producent", value: this.producer });

      if (filters.length !== 0) {
        store.dispatch("rmaList/applyFilters", filters);
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
      <textInput
        id="ticketId"
        label="Numer zgłoszenia"
        inputType="number"
        v-model="ticketId"
      />
      <textInput
        id="waybill"
        label="Numer listu przewozowego"
        v-model="waybill"
      />

      <selectInput
        id="status"
        label="Status zgłoszenia"
        v-model="status"
        :display="true"
      >
        <option value="" selected disabled hidden>Wybierz status</option>
        <option v-for="status in statuses" :value="status.id">
          {{ status.displayName }}
        </option>
      </selectInput>

      <selectInput
        id="type"
        label="Typ zgłoszenia"
        v-model="type"
        :display="true"
      >
        <option value="" selected disabled hidden>Wybierz typ</option>
        <option value="1">gwarancja</option>
        <option value="2">płatne</option>
      </selectInput>

      <textInput id="sn" label="Numer seryjny" v-model="sn" />
      <textInput id="producer" label="Producent" v-model="producer" />

      <p class="error" :class="{ active: error_form !== '' }">
        {{ this.error_form }}
      </p>
      <submitButton label="Zastosuj" />
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
