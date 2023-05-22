<script>
import { mapGetters } from "vuex";
import store from "../../../../store";

import submitButton from "../../../../parts/buttons/submitButton.vue";

export default {
  data() {
    return {
      comment: "",
    };
  },
  components: { submitButton },
  computed: {
    ...mapGetters({
      ticketId: "rma/getTicketId",
    }),
  },
  methods: {
    onSubmit() {
      if (this.comment !== "") {
        store.dispatch("rma/addCommentToTicket", {
          ticketId: this.ticketId,
          comment: this.comment,
        });
        this.comment = "";
      }
    },
  },
};
</script>
<template>
  <form v-on:submit.prevent="onSubmit">
    <label for="comment">Dodaj ustalenia</label>
    <textarea id="comment" v-model.lazy="comment" cols="50" rows="5"></textarea>
    <submitButton label="Zapisz" />
  </form>
</template>
<style scoped>
form {
  width: 80%;
}

input[type="submit"] {
  width: 25%;
}
</style>
