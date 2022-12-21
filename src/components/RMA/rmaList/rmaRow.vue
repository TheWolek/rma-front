<script>
export default {
  props: ["data"],
  methods: {},
};
</script>
<template>
  <tr>
    <td></td>
    <td>
      <router-link
        :to="{ path: 'items', query: { ticketId: data.ticket_id } }"
        >{{ data.ticket_id }}</router-link
      >
    </td>
    <td>{{ data.device_cat }}</td>
    <td>{{ data.device_producer }} {{ data.device_name }}</td>
    <td>{{ data.status }}</td>
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
