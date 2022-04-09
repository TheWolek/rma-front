<script>
import { mapState } from "vuex";
import row from "./itemsRow.vue";

export default {
  components: {
    row,
  },
  computed: {
    ...mapState({
      orderData: (state) => state.sparepartsOrders.ordersItems,
    }),
  },
};
</script>
<template>
  <table>
    <tr>
      <th></th>
      <th>producent</th>
      <th>model</th>
      <th>ilość</th>
    </tr>
    <row
      v-for="item in orderData.items"
      :key="item.order_item_id"
      :data="item"
    />
  </table>
</template>
<style scoped>
table {
  margin-top: 0;
  width: 45%;
}

table tr th:nth-child(1),
table tr td:nth-child(1) {
  width: 4%;
}

table tr th:nth-child(2),
table tr td:nth-child(2) {
  width: 20%;
}

table tr th:nth-child(3),
table tr td:nth-child(3) {
  width: 30%;
}

table tr th:nth-child(4),
table tr td:nth-child(4) {
  width: 8%;
}
</style>
