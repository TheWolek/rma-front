<script>
import { mapState } from "vuex";

export default {
  props: ["data"],
  methods: {},
  computed: {
    ...mapState({
      statuses: (state) => state.rma.statuses,
    }),
    getStatusDisplayName() {
      return this.statuses.find((o) => o.id === this.data.status).displayName;
    },
  },
};
</script>
<template>
  <tr>
    <td></td>
    <td>
      <router-link :to="{ path: `ticket/${data.ticket_id}` }">{{
        data.ticket_id
      }}</router-link>
    </td>
    <td>{{ data.device_cat }}</td>
    <td>{{ data.device_producer }} {{ data.device_name }}</td>
    <td>{{ getStatusDisplayName }}</td>
    <td>{{ data.type }}</td>
    <td>{{ data.created }}</td>
  </tr>
</template>
<style scoped>
a,
a:visited {
  color: #000;
  font-weight: bold;
}
</style>
