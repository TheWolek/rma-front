<script>
import { mapState } from "vuex";
import store from "../../../../../store";

export default {
  data() {
    return {
      modelToAdd: "",
      amountToAdd: "",
      regInt: /^([1-9]{1,})([0-9]{0,})$/,
    };
  },
  computed: {
    ...mapState({
      activeNewRow: (state) => state.sparepartsOrders.activeNewRow,
      categories: (state) => state.sparepartsOrders.categories,
      orderData: (state) => state.sparepartsOrders.ordersItems.orderData,
    }),
  },
  methods: {
    isModelValid() {
      return this.regInt.test(this.modelToAdd);
    },
    isAmountValid() {
      return this.regInt.test(this.amountToAdd);
    },
    clearData() {
      this.modelToAdd = "";
      this.amountToAdd = "";
    },
    onAdd() {
      if (!this.isModelValid)
        return console.log("niepoprawny format pola model");
      if (!this.isAmountValid)
        return console.log("niepoprawny format pola amount");

      store.dispatch("sparepartsOrders/addOrderItem", {
        order_id: this.orderData.part_order_id,
        part_cat_id: this.modelToAdd,
        amount: this.amountToAdd,
      });

      this.clearData();
    },
    onChangeModel() {},
    onChangeAmount() {},
  },
};
</script>
<template>
  <tr>
    <td></td>
    <td class="addInput" data-after="">
      <select
        id="addInput"
        v-model="modelToAdd"
        v-on:keyup.enter="onAdd"
        @change="onChangeModel"
        :disabled="!this.activeNewRow"
      >
        <option value="" disabled>Model</option>
        <option
          v-for="cat in categories"
          :key="cat.part_cat_id"
          :value="cat.part_cat_id"
        >
          {{ cat.producer + " " + cat.name }}
        </option>
      </select>
    </td>
    <td></td>
    <td class="addInput" data-after="">
      <input
        id="addInputAmount"
        type="number"
        v-model="amountToAdd"
        v-on:keyup.enter="onAdd"
        @change="onChangeAmount"
        :disabled="!this.activeNewRow"
      />
    </td>
  </tr>
</template>
<style scoped>
.addInput {
  padding: 0.1em;
}

.addInput #addInput {
  padding: 0.25em;
}

.addInput #addInput,
.addInput #addInputAmount {
  width: 100%;
  border: 1px solid #000;
}
</style>
