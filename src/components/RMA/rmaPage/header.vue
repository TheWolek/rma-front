<script>
import { mapGetters } from "vuex";

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
    inEditMode_issue() {
      return this.editMode_issue;
    },
    inEditMode_sn() {
      return this.editMode_sn;
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
      Status: <b>{{ rmaPage.status }}</b>
    </h3>
    <h3>
      Typ: <b>{{ rmaPage.type }}</b>
    </h3>
    <h3>
      Utworzono: <b>{{ rmaPage.created }}</b>
    </h3>
  </div>
</template>
<style scoped>
.ticketDetails {
  margin-bottom: 1em;
}
</style>
