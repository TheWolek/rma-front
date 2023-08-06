<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<template>
  <tr>
    <td>{{ item.waybill }}</td>
    <td>{{ item.barcode }}</td>
  </tr>
</template>
