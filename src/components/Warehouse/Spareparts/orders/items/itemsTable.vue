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
      <th>akcje</th>
    </tr>
    <row
      v-for="item in orderData.items"
      :key="item.order_item_id"
      :data="item"
    />
  </table>
</template>
<style scoped></style>
