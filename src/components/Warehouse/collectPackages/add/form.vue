<script>
import textInput from "@/parts/inputs/textInput.vue";
import submitButton from "@/parts/buttons/submitButton.vue";
import store from "@/store";
import router from "../../../../router";

export default {
  data() {
    return {
      refName: "",
      err_refName: "",
    };
  },
  components: { textInput, submitButton },
  methods: {
    clearForm() {
      this.refName = "";
      this.err_refName = "";
    },
    submit() {
      if (this.refName === "") {
        return (this.err_refName = "Pole jest wymagane");
      }
      store.dispatch("collectPackages/addNewCollect", this.refName);
    },
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="submit">
      <textInput
        id="refName"
        label="Numer zbiorczy"
        v-model="refName"
        :err="err_refName"
      />
      <submitButton label="Utwórz" />
    </form>
  </div>
</template>
<style scoped>
.form-group {
  width: 40%;
}

input[type="submit"] {
  width: 150px;
}
</style>
