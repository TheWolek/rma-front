<script>
import { mapState } from "vuex";
import store from "../../../../../store";

export default {
  props: ["data"],
  data() {
    return {
      modelData: {},
      check: false,
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.sparepartsOrders.categories,
    }),
  },
  mounted() {
    this.modelData = this.categories.find(
      (o) => o.part_cat_id === this.data.part_cat_id
    );
  },
  methods: {
    toggleCheck() {
      this.check = !this.check;
      store.commit(
        "sparepartsOrders/toggleOrdersItemsChecked",
        this.data.order_item_id
      );
    },
  },
};
</script>
<template>
  <tr>
    <td><input type="checkbox" @click="toggleCheck" /></td>
    <td>{{ this.modelData.producer }}</td>
    <td>{{ this.modelData.name }}</td>
    <td>{{ this.data.amount }}</td>
  </tr>
</template>
<style scoped></style>
