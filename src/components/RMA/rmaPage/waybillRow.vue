<script>
import formatDate from "../../../utils/formatDate";

export default {
  props: ["data"],
  computed: {
    getCreatedDate() {
      return formatDate(this.data.created);
    },
    getLastUpdateDate() {
      if (this.data.lastUpdate === null) return "--";
      return formatDate(this.data.lastUpdate);
    },
  },
};
</script>
<template>
  <tr>
    <td>{{ data.waybill_number }}</td>
    <td>{{ data.status }}</td>
    <td>{{ data.type }}</td>
    <td>{{ getCreatedDate }}</td>
    <td>{{ getLastUpdateDate }}</td>
  </tr>
</template>
