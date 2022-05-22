<script>
import { mapState } from "vuex";
import store from "../../../../store";

export default {
  props: ["item"],
  data() {
    return {
      tempCode: "",
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.sparepartsOrders.categories,
    }),
  },
  methods: {
    getFullItemName() {
      let cat = this.categories.find(
        (o) => o.part_cat_id === this.item.part_cat_id
      );
      return cat.producer + " " + cat.name;
    },
    onAdd() {
      console.log(this.tempCode);
      store.commit("sparepartsOrders/addSnToPart", {
        index: this.item.index,
        code: this.tempCode,
      });
      this.tempCode = "";
    },
  },
};
</script>
<template>
  <div class="partBarcodes">
    <label
      >{{ getFullItemName() }}
      <b>({{ this.item.codes.length }} z {{ this.item.amount }})</b></label
    >
    <input
      type="text"
      v-model="tempCode"
      v-on:keyup.enter="onAdd"
      :disabled="this.item.codes.length === this.item.amount"
    />
  </div>
</template>
