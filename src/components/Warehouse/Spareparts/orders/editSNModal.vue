<script>
import { mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";

import snField from "./snField.vue";

export default {
  data() {
    return {};
  },
  components: { bigModal, snField },
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
  <bigModal
    :modalActive="this.editSNModal_active"
    :toggleAction="toggleModal"
    modalTitle="Odbiór dostawy - skanowanie kodów kreskowych"
  >
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
  </bigModal>
</template>
<style scoped>
#sparepartsOrderEditSNModalWrap .form-group {
  width: 100%;
}

.partBarcodes + .partBarcodes {
  margin-top: 0.4em;
}
</style>
