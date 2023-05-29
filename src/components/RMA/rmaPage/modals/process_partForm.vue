<script>
import { mapGetters } from "vuex";
import store from "../../../../store";

import submitButton from "../../../../parts/buttons/submitButton.vue";
import textInput from "../../../../parts/inputs/textInput.vue";

export default {
  data() {
    return {
      sn: "",
    };
  },
  components: { submitButton, textInput },
  computed: {
    ...mapGetters({
      ticketId: "rmaPage/getTicketId",
      partError: "rmaPage/getPartError",
    }),
  },
  methods: {
    onSubmit() {
      if (this.sn !== "") {
        store.dispatch("rmaPage/addPartToTicket", {
          sn: this.sn,
          ticketId: this.ticketId,
        });
        this.sn = "";
      }
    },
  },
};
</script>
<template>
  <form v-on:submit.prevent="onSubmit">
    <textInput
      id="sn"
      label="Numer seryjny części"
      v-model="sn"
      :error="partError"
    />
    <submitButton label="Dodaj" />
  </form>
</template>
<style scoped>
form {
  margin-bottom: 1em;
}

p.error {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: red;
  margin: 0;
  padding: 0;
  text-transform: none;
}

input[type="submit"] {
  margin-top: 1.5em;
}
</style>
