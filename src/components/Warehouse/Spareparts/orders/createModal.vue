<script>
import { mapState } from "vuex";
import store from "../../../../store";
import formatDate from "../../../../utils/formatDate";
import bigModal from "../../../../parts/bigModal.vue";
import textInput from "../../../../parts/inputs/textInput.vue";
import submitButton from "../../../../parts/buttons/submitButton.vue";
import selectInput from "../../../../parts/inputs/selectInput.vue";

import { getUrl, sparepartsOrders } from "../../../../helpers/endpoints";

export default {
  data() {
    return {
      supplier: "",
      error_supplier: "",
      date: "",
      error_date: "",
    };
  },
  components: { bigModal, textInput, submitButton, selectInput },
  computed: {
    ...mapState({
      createModalActive: (state) => state.sparepartsOrders.createModal_active,
      suppliers: (state) => state.sparepartsOrders.suppliers,
    }),
    today: () => formatDate(new Date()),
  },
  methods: {
    clearData() {
      this.supplier = "";
      this.error_supplier = "";
      this.date = "";
      this.error_date = "";
    },
    toggleModal() {
      store.commit("sparepartsOrders/toggleCreateModal");
      this.clearData();
    },
    showError(context, error) {
      if (context == "error_supplier") return (this.error_supplier = error);
      if (context == "error_date") return (this.error_date = error);
    },
    clearError(context) {
      if (context == "error_supplier") return (this.error_supplier = "");
      if (context == "error_date") return (this.error_date = "");
    },
    onChangeSupplier() {
      if (this.supplier !== "") this.clearError("error_supplier");
    },
    onChangeDate() {
      if (this.date !== "") this.clearError("error_date");
    },
    handleSubmitCreate() {
      if (this.supplier === "")
        return this.showError("error_supplier", "wybierz dostawcę");
      if (this.date === "") return this.showError("error_date", "wybierz datę");

      let date = new Date(this.date).toISOString();
      let data = {
        supplier_id: this.supplier,
        exp_date: date,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      fetch(getUrl(sparepartsOrders), requestOptions)
        .then(async (res) => {
          const resData = await res.json();

          if (!res.ok) {
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }

          let item = {
            part_order_id: resData.order_id,
            expected_date: date,
            supplier_id: this.supplier,
            status: 0,
          };

          store.dispatch("sparepartsOrders/submitModal_Create", item);
          store.commit("sparepartsOrders/setOrdersItems", {
            orderData: item,
            items: [],
          });
          store.commit("sparepartsOrders/toggleEditOrderMode");
          this.toggleModal();
        })
        .catch((error) => {
          return this.displayError(error);
        });
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.createModalActive"
    :toggleAction="toggleModal"
    modalTitle="Dodawanie nowej dostawy części"
  >
    <form v-on:submit.prevent="handleSubmitCreate">
      <selectInput
        id="supplier"
        label="Dostawca"
        v-model="supplier"
        :change="onChangeSupplier"
        :error="error_supplier"
        :options="suppliers"
      />
      <textInput
        id="date"
        label="Data dostawy"
        inputType="date"
        v-model="date"
        :change="onChangeDate"
        :error="error_date"
        :min="today"
      />
      <submitButton label="Dodaj" />
    </form>
  </bigModal>
</template>
