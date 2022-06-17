<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<template>
  <tr :id="this.data.part.cat_id">
    <td><input type="checkbox" :id="this.data.part.cat_id" /></td>
    <td>{{ this.data.part.category }}</td>
    <td>{{ this.data.part.producer }}</td>
    <td>{{ this.data.part.name }}</td>
    <td>{{ this.data.warehouse.totalAmount + " szt" }}</td>
  </tr>
</template>
