<script>
import { mapState } from "vuex";
import store from "../../../../store";
import formatDate from "../../../../utils/formatDate";
import bigModal from "../../../../parts/bigModal.vue";

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
  components: { bigModal },
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
      <div class="form-group">
        <label for="supplier">dostawca</label>
        <div>
          <select
            id="supplier"
            v-model="supplier"
            :disabled="formData.mode == 'status'"
          >
            <option disabled value>dostawca</option>
            <option v-for="el in suppliers" :key="el.id" :value="el.id">
              {{ el.name }}
            </option>
          </select>
          <p
            id="error_supplier"
            class="error_modal_form"
            :class="{ active: this.error_supplier !== '' }"
          >
            {{ this.error_supplier }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="date">data dostawy</label>
        <div>
          <input
            type="date"
            id="date"
            v-model="dateFormatted"
            @change="onChangeDate"
            :disabled="formData.mode == 'status'"
          />
          <p
            id="error_date"
            class="error_modal_form"
            :class="{ active: this.error_date !== '' }"
          >
            {{ this.error_date }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="status">status</label>
        <div>
          <select id="status" v-model="orderStatus">
            <option disabled value>status</option>
            <option v-for="el in statuses" :key="el.id" :value="el.id">
              {{ el.name }}
            </option>
          </select>
          <p
            id="error_orderStatus"
            class="error_modal_form"
            :class="{ active: this.error_orderStatus !== '' }"
          >
            {{ this.error_orderStatus }}
          </p>
        </div>
      </div>
      <input type="submit" value="Edytuj" />
    </form>
  </bigModal>
</template>
<style scoped>
#sparepartsOrderEditModalWrap .form-group {
  width: 100%;
}
</style>
