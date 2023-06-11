<script>
import inlineEditInput from "@/parts/inputs/inlineEditInput.vue";
import checkboxGroup2 from "@/parts/inputs/checkboxGroup2.vue";
import actionButton from "@/parts/buttons/actionButton.vue";
import selectInput from "@/parts/inputs/selectInput.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  components: { inlineEditInput, checkboxGroup2, actionButton, selectInput },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
      getAccessoriesTypes: "rmaDictionaries/getAccessoriesTypes",
      getDamageTypes: "rmaDictionaries/getDamageTypes",
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
    damageType: {
      get() {
        return this.rmaPage.damage_type.toString();
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "damage_type",
          newVaule: value,
        });
      },
    },
    damageDescription: {
      get() {
        return this.rmaPage.damage_description;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "damage_description",
          newVaule: value,
        });
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
    <div class="form-group">
      <selectInput
        id="damageType"
        label="Stan urządzenia"
        v-model="damageType"
        :options="getDamageTypes"
        :disabled="!this.editMode"
      />
    </div>
    <h3>Opis stanu technicznego</h3>
    <textarea
      name="damageDescription"
      id="damageDescription"
      v-model="damageDescription"
      cols="30"
      rows="5"
      :disabled="!this.editMode"
    ></textarea>

    <div class="barcode" v-if="inWarehouse">
      <h3>
        Barcode: <b>{{ getBarcode }}</b>
      </h3>
    </div>
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
<style scoped>
textarea {
  width: 80%;
}

.form-group {
  margin-top: 8px;
}

.barcode {
  margin-top: 16px;
}
</style>
