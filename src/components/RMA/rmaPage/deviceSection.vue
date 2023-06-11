<script>
import inlineEditInput from "@/parts/inputs/inlineEditInput.vue";
import checkboxGroup2 from "@/parts/inputs/checkboxGroup2.vue";
import actionButton from "../../../parts/buttons/actionButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { inlineEditInput, checkboxGroup2, actionButton },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
      getAccessoriesTypes: "rmaDictionaries/getAccessoriesTypes",
      getBarcode: "rmaPage/getBarcode",
    }),
    inWarehouse() {
      return this.rmaPage.inWarehouse;
    },
    sn: {
      get() {
        return this.rmaPage.device_sn;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "device_sn",
          newVaule: value,
        });
      },
    },
    accessories: {
      get() {
        return this.$store.state.rmaAccessories.accessories;
      },
      set(value) {
        this.$store.commit("rmaAccessories/setAccessories", value);
      },
    },
  },
  methods: {
    changeShelve() {
      store.dispatch("items/fetchAllShelves");
      setTimeout(() => {
        this.$router.push({
          name: "itemsChangeShelve",
          params: {
            barcode: this.getBarcode,
            activeShelve: this.rmaPage.shelve_id,
          },
        });
      }, 100);
    },
  },
};
</script>
<template>
  <div class="device">
    <h2>Urządzenie</h2>
    <h3>{{ rmaPage.device_cat }}</h3>
    <h3>{{ rmaPage.device_producer }} {{ rmaPage.device_name }}</h3>
    <inlineEditInput
      id="sn"
      label="SN:"
      v-model="sn"
      :disabled="!this.editMode"
    />
    <checkboxGroup2
      v-model:value="accessories"
      name="accessories"
      :options="getAccessoriesTypes"
      :disabledAll="!this.editMode"
    />
    <div class="register" v-if="inWarehouse">
      <h3>
        Warehouse ID: <b>#{{ rmaPage.item_id }}</b>
      </h3>
    </div>
    <div class="shelve" v-if="inWarehouse">
      <actionButton :event="changeShelve" display="Zmień lokalizacje" />
      <h3>
        Lokalizacja: <b>{{ rmaPage.code }}</b>
      </h3>
    </div>
  </div>
</template>
