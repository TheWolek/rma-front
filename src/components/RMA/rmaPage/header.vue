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
    console.log(this.rmaPage);
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
  <div class="wrap">
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
    <div>
      <h2>Urządzenie</h2>
      <h3>{{ rmaPage.device_cat }}</h3>
      <h3>{{ rmaPage.device_producer }} {{ rmaPage.device_name }}</h3>
      <div class="inlineEdit">
        <h3>SN:</h3>
        <input type="text" v-model="sn" :disabled="!inEditMode_sn" />
        <div class="btn" @click="toggleEdit_sn">
          <img src="@/assets/edit.svg" />
        </div>
      </div>
    </div>
    <div>
      <h2>Diagnoza</h2>
      <div class="issueWrap">
        <textarea
          name="issue"
          id="issue"
          v-model="issue"
          cols="70"
          rows="10"
          :disabled="!inEditMode_issue"
        ></textarea>
        <div class="btn" @click="toggleEdit_issue">
          <img src="@/assets/edit.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrap {
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}

.ticketDetails {
  grid-column: 1/3;
}

.issueWrap {
  padding: 0.5em;
  display: flex;
  gap: 0.6em;
}
</style>
