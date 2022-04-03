<script>
import { mapState } from "vuex";
import store from "../../../../store";
import formatDate from "../../../../utils/formatDate";
export default {
  data() {
    return {
      model: "",
      amount: "",
      date: "",
      orderStatus: "",
      error_model: "",
      error_amount: "",
      error_date: "",
      error_orderStatus: "",
    };
  },
  computed: {
    ...mapState({
      editModal_active: (state) => state.sparepartsOrders.editModal_active,
      categories: (state) => state.sparepartsOrders.categories,
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
        console.log("change", val);
        this.model = this.formData.part_cat_id;
        this.amount = this.formData.amount;
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
      let url = `http://localhost:3000/warehouse/spareparts/orders`;
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
            part_order_id: this.formData.part_order_id,
            amount: this.amount,
            expected_date: this.date,
            part_cat_id: this.model,
            status: this.orderStatus,
          };

          store.dispatch("sparepartsOrders/submitModal_Create", item);
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
  <div
    id="sparepartsOrderEditModalWrap"
    class="bigModal"
    :class="{ active: this.editModal_active }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Edycja dostawy części</h4>
      </div>
      <form v-on:submit.prevent="handleSubmitEdit">
        <div class="form-group">
          <label for="model">Model</label>
          <div>
            <select
              id="model"
              v-model="model"
              @change="onChangeModel"
              :disabled="formData.mode == 'status'"
            >
              <option disabled value>Model</option>
              <option
                v-for="el in categories"
                :key="el.part_cat_id"
                :value="el.part_cat_id"
              >
                {{ el.producer + " " + el.name }}
              </option>
            </select>
            <p
              id="error_model"
              class="error_modal_form"
              :class="{ active: this.error_model !== '' }"
            >
              {{ this.error_model }}
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="amount">ilość</label>
          <div>
            <input
              type="number"
              id="amount"
              v-model.lazy="amount"
              @change="onChangeAmount"
              :disabled="formData.mode == 'status'"
            />
            <p
              id="error_amount"
              class="error_modal_form"
              :class="{ active: this.error_amount !== '' }"
            >
              {{ this.error_amount }}
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
              <option disabled value>Model</option>
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
    </div>
  </div>
</template>
<style scoped>
#sparepartsOrderEditModalWrap .form-group {
  width: 100%;
}
</style>