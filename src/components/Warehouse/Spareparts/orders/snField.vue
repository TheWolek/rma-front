<script>
import { mapState } from "vuex";
import store from "../../../../store";
import textInput from "../../../../parts/inputs/textInput.vue";

export default {
  props: ["item"],
  data() {
    return {
      tempCode: "",
    };
  },
  components: { textInput },
  computed: {
    ...mapState({
      categories: (state) => state.sparepartsOrders.categories,
    }),
    getFullItemName() {
      let cat = this.categories.find(
        (o) => o.part_cat_id === this.item.part_cat_id
      );
      return `${cat.producer} ${cat.name} (${this.item.codes.length} z ${this.item.amount})`;
    },
  },
  methods: {
    onAdd() {
      if (this.tempCode !== "") {
        store.commit("sparepartsOrders/addSnToPart", {
          index: this.item.index,
          code: this.tempCode,
        });
        this.tempCode = "";
      }
    },
  },
};
</script>
<template>
  <div class="partBarcodes">
    <textInput
      id="sn"
      :label="getFullItemName"
      v-model="tempCode"
      :onEnter="onAdd"
      :disabled="this.item.codes.length === this.item.amount"
    />
  </div>
</template>
