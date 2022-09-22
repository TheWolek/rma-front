<script>
import { mapState } from "vuex";
import store from "../../../store";
import fetchSubmit from "./handleSubmit";

export default {
  data() {
    return {
      category: "",
      name: "",
      producer: "",
      error_form: "",
      error_category: "",
      error_name: "",
      error_producer: "",
    };
  },
  extends: fetchSubmit,
  computed: {
    ...mapState({
      findModalActive: (state) => state.spareparts.findModalActive,
    }),
    error_formActive() {
      if (
        this.error_form != "" &&
        (this.category != "" || this.name != "" || this.producer != "")
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
      this.category = "";
      this.name = "";
      this.producer = "";
      this.error_form = "";
      this.error_category = "";
      this.error_producer = "";
      this.error_name = "";
    },
    toggleModal() {
      store.commit("spareparts/toggleFindModal");
    },
    showError(context, error) {
      if (context === "error_form") return (this.error_form = error);
    },
    handleSubmit() {
      if (
        this.category.trim() === "" &&
        (this.name.trim() === "") & (this.producer.trim() === "")
      ) {
        return this.showError(
          "error_form",
          "uzupełnij przynajmniej jedną opcję"
        );
      }

      //let url = `http://localhost:3000/warehouse/spareparts/?`;
      let query = {};

      if (this.category !== "") query.cat = this.category;
      if (this.producer !== "") query.prod = this.producer;
      if (this.name !== "") query.name = this.name;

      // if (this.category !== "") url += `category=${this.category}`;
      // if (this.producer !== "") {
      //   if (this.category !== "") url += `&`;
      //   url += `producer=${this.producer}`;
      // }
      // if (this.name !== "") {
      //   if (this.category !== "" || this.producer !== "") url += `&`;
      //   url += `name=${this.name}`;
      // }

      this.$router.push({ path: "/warehouse/spareparts", query: query });
      this.toggleModal();
      this.handleSubmit_find(query);
      this.clearData();

      // fetch(url)
      //   .then(async (res) => {
      //     store.commit("spareparts/toggleRefreshTable", true);
      //     const resData = await res.json();
      //     let filters = {
      //       active: true,
      //       names: {},
      //     };

      //     if (this.category !== "") filters.names.category = this.category;
      //     if (this.producer !== "") filters.names.producer = this.producer;
      //     if (this.name !== "") filters.names.name = this.name;

      //     console.log(resData);

      //     if (!res.ok) {
      //       store.commit("spareparts/toggleRefreshTable", false);
      //       this.toggleModal();
      //       if (res.status == 404) {
      //         store.dispatch("spareparts/submitModal_Find", {
      //           data: [],
      //           filters: filters,
      //         });
      //         this.clearData();
      //         console.log("nothing was found");
      //         return;
      //       }
      //       const error = (resData && resData.message) || res.status;
      //       return Promise.reject(error);
      //     }
      //     this.toggleModal();
      //     setTimeout(() => {
      //       store.dispatch("spareparts/submitModal_Find", {
      //         data: resData,
      //         filters: filters,
      //       });
      //       this.clearData();
      //       store.commit("spareparts/toggleRefreshTable", false);
      //     }, 500);
      //   })
      //   .catch((error) => {
      //     return this.showError("error_form", error);
      //   });
    },
  },
};
</script>
<template>
  <div
    id="sparepartsFindModalWrap"
    class="bigModal"
    :class="{ active: this.findModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Wyszukiwanie części zamiennych</h4>
      </div>
      <form v-on:submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="category">Kategoria</label>
          <div>
            <input type="text" v-model="category" />
            <p id="error_category" class="error_modal_form">
              {{ this.error_category }}
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="producer">Producent</label>
          <div>
            <input type="text" v-model="producer" />
            <p id="error_producer" class="error_modal_form">
              {{ this.error_producer }}
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="name">Nazwa</label>
          <div>
            <input type="text" v-model="name" />
            <p id="error_name" class="error_modal_form">
              {{ this.error_name }}
            </p>
          </div>
        </div>
        <input type="submit" value="Szukaj" />
        <p
          id="error_form"
          class="error_modal_form"
          :class="{ active: this.error_formActive }"
        >
          {{ this.error_form }}
        </p>
      </form>
    </div>
  </div>
</template>
<style scoped>
.form-group {
  width: 100%;
}
</style>
