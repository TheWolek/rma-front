<script>
import formatDateAndHours from "../../../../utils/formatDateAndHours";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getDate() {
      return formatDateAndHours(this.item.created);
    },
  },
};
</script>
<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'collectPackage', params: { id: item.id } }">{{
        item.id
      }}</RouterLink>
    </td>
    <td>{{ item.ref_name }}</td>
    <td>{{ getDate }}</td>
    <td>{{ item.status }}</td>
  </tr>
</template>
<style scoped>
a {
  color: var(--vt-c-black-mute);
  font-weight: bold;
  display: block;
  width: 100%;
}

table tr td:nth-of-type(1) {
  width: 40px;
}

table tr td:nth-of-type(2) {
  width: 180px;
}

table tr td:nth-of-type(3),
table tr td:nth-of-type(4) {
  width: 130px;
}
</style>
