<script>
import { mapGetters, mapState } from "vuex";
import getTypeDisplayName from "../../../utils/getRmaTypeDisplayName";
import formatDateAndHours from "../../../utils/formatDateAndHours";

export default {
  data() {
    return {
      editMode_issue: false,
      issue: "",
      editMode_sn: false,
      sn: "",
    };
  },
  mounted() {
    this.issue = this.rmaPage.issue;
    this.sn = this.rmaPage.device_sn;
  },
  computed: {
    ...mapGetters({
      rmaPage: "rma/getRmaPage",
    }),
    ...mapState({
      statuses: (state) => state.rma.statuses,
    }),
    inEditMode_issue() {
      return this.editMode_issue;
    },
    inEditMode_sn() {
      return this.editMode_sn;
    },
    getStatusDisplayName() {
      return this.statuses.find((o) => o.id === this.rmaPage.status)
        .displayName;
    },
    getTypeDisplayName() {
      return getTypeDisplayName(this.rmaPage.type);
    },
    getFormattedCreatedDate() {
      return formatDateAndHours(this.rmaPage.created);
    },
    getFormattedStatusDate() {
      if (this.rmaPage.lastStatusUpdate === null) return "--";
      return formatDateAndHours(this.rmaPage.lastStatusUpdate);
    },
  },
  methods: {
    toggleEdit_issue() {
      this.editMode_issue = !this.editMode_issue;
    },
    toggleEdit_sn() {
      this.editMode_sn = !this.editMode_sn;
    },
  },
};
</script>
<template>
  <h1>Zgłoszenie {{ rmaPage.ticket_id }}</h1>
  <div class="ticketDetails">
    <h3>
      Status: <b>{{ getStatusDisplayName }}</b>
    </h3>
    <h3>
      Typ: <b>{{ getTypeDisplayName }}</b>
    </h3>
    <h3>
      Utworzono: <b>{{ getFormattedCreatedDate }}</b>
    </h3>
    <h3>
      Ostatnia zmiana statusu: <b>{{ getFormattedStatusDate }}</b>
    </h3>
  </div>
</template>
<style scoped>
.ticketDetails {
  margin-bottom: 1em;
}
</style>
