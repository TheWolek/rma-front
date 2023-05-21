<script>
import { mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";
import textInput from "../../../../parts/inputs/textInput.vue";
import submitButton from "../../../../parts/buttons/submitButton.vue";
import selectInput from "../../../../parts/inputs/selectInput.vue";

import { getUrl, sparepartsOrdersFind } from "../../../../helpers/endpoints";

export default {
  data() {
    return {
      model: "",
      error_model: "",
      date: "",
      error_date: "",
      status: "",
      error_status: "",
      error_form: "",
    };
  },
  components: { bigModal, textInput, submitButton, selectInput },
  computed: {
    ...mapState({
      findModalActive: (state) => state.sparepartsOrders.findModal_active,
      categories: (state) => state.sparepartsOrders.categories,
      statuses: (state) => state.sparepartsOrders.statuses,
    }),
    error_formActive() {
      if (
        this.error_form != "" &&
        (this.model != "" || this.date != "" || this.status != "")
      ) {
        this.error_form = "";
        return false;
      }
      if (this.error_form == "") return false;
      return true;
    },
  },
  methods: {
    clearData() {
      (this.model = ""),
        (this.date = ""),
        (this.status = ""),
        (this.error_model = "");
      this.error_date = "";
      this.error_status = "";
      this.error_form = "";
    },
    toggleModal() {
      store.commit("sparepartsOrders/toggleFindModal");
      this.clearData();
    },
    showError(context, error) {
      if (context == "error_form") return (this.error_form = error);
    },
    handleSubmit() {
      if (this.model === "" && this.status === "" && this.date === "") {
        return this.showError(
          "error_form",
          "uzupełnij przynajmniej jedną opcję"
        );
      }

      let url = `${getUrl(sparepartsOrdersFind)}?`;

      if (this.model !== "") url += `partCatId=${this.model}`;
      if (this.status !== "") {
        if (this.model !== "") url += `&`;
        url += `status=${this.status}`;
      }
      if (this.date !== "") {
        if (this.model !== "" || this.status !== "") url += `&`;
        url += `expDate=${this.date}`;
      }

      fetch(url)
        .then(async (res) => {
          store.commit("sparepartsOrders/toggleRefreshTable", true);
          const resData = await res.json();
          let filters = {
            active: true,
            names: {},
          };

          let model = this.categories.find((o) => o.part_cat_id === this.model);

          if (this.model !== "")
            filters.names.partCatId = [
              model.producer + " " + model.name,
              this.model,
            ];
          if (this.status !== "")
            filters.names.status = [
              this.statuses[this.status].name,
              this.status,
            ];
          if (this.date !== "") filters.names.expDate = [this.date, this.date]; //[this.date, new Date(this.date).toISOString()]

          if (!res.ok) {
            store.commit("sparepartsOrders/toggleRefreshTable", false);
            if (res.status == 404) {
              store.dispatch("sparepartsOrders/submitModal_Find", {
                data: [],
                filters,
                filters,
              });
              this.toggleModal();
              return;
            }
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }
          this.toggleModal();
          setTimeout(() => {
            store.dispatch("sparepartsOrders/submitModal_Find", {
              data: resData,
              filters: filters,
            });
            store.commit("sparepartsOrders/toggleRefreshTable", false);
          }, 500);
        })
        .catch((error) => {
          return this.showError("form_error", error);
        });
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="this.findModalActive"
    :toggleAction="toggleModal"
    modalTitle="Wyszukiwanie dostawy części"
  >
    <form v-on:submit.prevent="handleSubmit">
      <selectInput
        id="model"
        label="Model"
        v-model="model"
        :error="error_model"
        :options="categories"
        display="true"
      >
        <option
          v-for="el in categories"
          :key="el.part_cat_id"
          :value="el.part_cat_id"
        >
          {{ el.producer + " " + el.name }}
        </option>
      </selectInput>

      <selectInput
        id="status"
        label="Status"
        v-model="status"
        :error="this.error_status"
        :options="statuses"
      />
      <textInput
        id="date"
        label="Data dostawy"
        inputType="date"
        v-model="date"
        :error="this.error_date"
      />
      <submitButton label="Szukaj" />
      <p
        id="error_form"
        class="error_modal_form"
        :class="{ active: this.error_formActive }"
      >
        {{ this.error_form }}
      </p>
    </form>
  </bigModal>
</template>
<style scoped>
#sparepartsOrderFindModalWrap .form-group {
  width: 100%;
}
</style>
