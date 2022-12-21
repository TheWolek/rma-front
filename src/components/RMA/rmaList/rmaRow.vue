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
        :to="{ path: 'items', query: { ticketId: data.ticketId } }"
        >{{ data.ticketId }}</router-link
      >
    </td>
    <td>{{ data.deviceCat }}</td>
    <td>{{ data.deviceProducer }} {{ data.deviceName }}</td>
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
