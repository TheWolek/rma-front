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
      date: "",
      orderStatus: "",
      error_supplier: "",
      error_date: "",
      error_orderStatus: "",
    };
  },
  components: { bigModal, textInput, submitButton, selectInput },
  computed: {
    ...mapState({
      editModal_active: (state) => state.sparepartsOrders.editModal_active,
      suppliers: (state) => state.sparepartsOrders.suppliers,
      statuses: (state) => state.sparepartsOrders.statuses,
      formData: (state) => state.sparepartsOrders.editModal_outsideData,
    }),
    dateFormatted() {
      return formatDate(this.date);
    },
  },
  watch: {
    formData(val) {
      if (val !== {}) {
        this.supplier = this.formData.supplier_id;
        this.date = this.formData.expected_date;
        this.orderStatus = this.formData.status;
      }
    },
  },
  methods: {
    toggleModal() {
      store.dispatch("sparepartsOrders/toggleEditModal");
    },
    handleSubmitEdit() {
      let data = {};
      let url = getUrl(sparepartsOrders);
      if (this.formData.mode === "status") {
        data = {
          order_id: this.formData.part_order_id,
          status: this.orderStatus,
        };
      }

      if (this.formData.mode === "all") {
        data = {
          order_id: this.formData.part_order_id,
          status: this.orderStatus,
          part_cat_id: this.model,
          amount: this.amount,
          exp_date: this.date,
        };
        url += `/edit`;
      }

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      fetch(url, requestOptions)
        .then(async (res) => {
          const resData = await res.json();

          if (!res.ok) {
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }

          let item = {
            order_id: this.formData.part_order_id,
            status: this.orderStatus,
          };

          store.dispatch("sparepartsOrders/submitModal_Edit", item);
          this.toggleModal();
        })
        .catch((error) => {
          return console.log(error);
        });
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.editModal_active"
    :toggleAction="toggleModal"
    modalTitle="Edycja dostawy części"
  >
    <form v-on:submit.prevent="handleSubmitEdit">
      <selectInput
        id="supplier"
        label="Dostawca"
        v-model="supplier"
        :error="error_supplier"
        :options="suppliers"
        :disabled="formData.mode == 'status'"
      />
      <textInput
        id="date"
        label="Data dostawy"
        inputType="date"
        v-model="dateFormatted"
        :error="error_date"
        :disabled="formData.mode == 'status'"
      />
      <selectInput
        id="status"
        label="Satus"
        v-model="orderStatus"
        :error="error_orderStatus"
        :options="statuses"
        :disabled="false"
      />
      <submitButton label="Edytuj" />
    </form>
  </bigModal>
</template>
<style scoped>
#sparepartsOrderEditModalWrap .form-group {
  width: 100%;
}
</style>
