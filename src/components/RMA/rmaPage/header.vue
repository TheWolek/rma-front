<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      rmaPage: (state) => state.rma.rmaPage,
    }),
  },
};
</script>
<template>
  <h1>Zgłoszenie {{ rmaPage.ticket_id }}</h1>
</template>
<style scoped></style>
