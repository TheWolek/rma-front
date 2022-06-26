<script>
import { mapState } from "vuex";
import store from "../../../../store";

import snField from "./snField.vue";

export default {
  data() {
    return {};
  },
  components: { snField },
  computed: {
    ...mapState({
      editSNModal_active: (state) => state.sparepartsOrders.editSNModal_active,
      items: (state) => state.sparepartsOrders.ordersItems.items,
    }),
    enabledSubmit() {
      let items = this.items;
      let good = 0;
      items.forEach((el) => {
        if (el.amount === el.codes.length) good += 1;
      });
      return good !== items.length;
    },
  },
  mounted() {
    store.commit("sparepartsOrders/clearPartsSn");
  },
  methods: {
    toggleModal() {
      store.commit("sparepartsOrders/toggleEditSNModal");
    },
    submit() {
      store.dispatch("spareparts/addSpareparts");
    },
  },
};
</script>
<template>
  <div
    id="sparepartsOrderEditSNModalWrap"
    class="bigModal"
    :class="{ active: this.editSNModal_active }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Odbiór dostawy - skanowanie kodów kreskowych</h4>
      </div>
      <form v-on:submit.prevent="">
        <div class="form-group">
          <snField
            v-for="(item, index) in items"
            :key="item.order_item_id"
            :item="{ ...item, index }"
          />
        </div>
        <input
          type="button"
          value="Odbierz"
          @click="submit"
          :disabled="this.enabledSubmit"
        />
      </form>
    </div>
  </div>
</template>
<style scoped>
#sparepartsOrderEditSNModalWrap .form-group {
  width: 100%;
}

.partBarcodes + .partBarcodes {
  margin-top: 0.4em;
}
</style>
