<script>
import { mapGetters } from "vuex";
import store from "../../../../store";

export default {
  data() {
    return {
      sn: "",
    };
  },
  computed: {
    ...mapGetters({
      ticketId: "rma/getTicketId",
      partError: "rma/getPartError",
    }),
  },
  methods: {
    onSubmit() {
      if (this.sn !== "") {
        store.dispatch("rma/addPartToTicket", {
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
    <label for="sn">Numer seryjny części</label>
    <div>
      <input type="text" v-model.lazy="sn" id="sn" />
      <p class="error">{{ partError }}</p>
    </div>
    <input type="submit" value="Dodaj" />
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
