<script>
import { mapState } from "vuex";
import store from "../../../../store";
export default {
  data() {
    return {
      supplier: "",
      error_supplier: "",
      date: "",
      error_date: "",
    };
  },
  computed: {
    ...mapState({
      createModalActive: (state) => state.sparepartsOrders.createModal_active,
      suppliers: (state) => state.sparepartsOrders.suppliers,
    }),
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

      fetch("http://localhost:3000/warehouse/spareparts/orders", requestOptions)
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
  <div
    id="sparepartsOrderCreateModalWrap"
    class="bigModal"
    :class="{ active: this.createModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Dodawanie nowej dostawy części</h4>
      </div>
      <form v-on:submit.prevent="handleSubmitCreate">
        <div class="form-group">
          <label for="supplier">Dostawca</label>
          <div>
            <select id="supplier" v-model="supplier" @change="onChangeSupplier">
              <option disabled value>Dostawca</option>
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
              v-model="date"
              @change="onChangeDate"
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
        <input type="submit" value="Dodaj" />
      </form>
    </div>
  </div>
</template>
<style scoped>
#sparepartsOrderCreateModalWrap .form-group {
  width: 100%;
}
</style>
