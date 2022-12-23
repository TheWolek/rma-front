<script>
import { mapState } from "vuex";
import loadingDots from "../../icons/loadingDots.vue";
import rmaRow from "./rmaRow.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      tickets: (state) => state.rma.tickets,
    }),
  },
  components: { loadingDots, rmaRow },
  methods: {},
};
</script>
<template>
  <div class="ticketsTable">
    <table>
      <div class="loadingWrap" :class="{ active: this.loading }">
        <loadingDots />
      </div>
      <tr>
        <th id="checkboxCol"></th>
        <th id="ticketIdCol">ID zgłoszenia</th>
        <th id="catCol">kategoria</th>
        <th id="modelCol">model</th>
        <th id="statusCol">status</th>
        <th id="typeCol">typ</th>
        <th id="createdCol">utworzono</th>
        <th id="lastUpdateCol">ostatnia zmiana statusu</th>
      </tr>
      <rmaRow v-for="ticket in tickets" :data="ticket" />
    </table>
  </div>
</template>
<style scoped>
table {
  width: 70%;
}
#checkboxCol {
  width: 4%;
}
#ticketIdCol {
  width: 9%;
}
#catCol {
  width: 14%;
}
#typeCol {
  width: 13%;
}
#statusCol {
  width: 15%;
}
</style>
