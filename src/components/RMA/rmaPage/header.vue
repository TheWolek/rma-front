<script>
import { mapGetters, mapState } from "vuex";
import getTypeDisplayName from "../../../utils/getRmaTypeDisplayName";
import formatDateAndHours from "../../../utils/formatDateAndHours";

export default {
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      statuses: "rmaDictionaries/getStatuses",
    }),
    getStatusDisplayName() {
      return this.statuses.find((o) => o.id === this.rmaPage?.status)?.name;
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
