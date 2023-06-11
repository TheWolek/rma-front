<script>
import { mapGetters } from "vuex";
import inlineEditInput from "@/parts/inputs/inlineEditInput.vue";

export default {
  components: { inlineEditInput },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
    }),
    name: {
      get() {
        return this.rmaPage.name;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "name",
          newVaule: value,
        });
      },
    },
    email: {
      get() {
        return this.rmaPage.email;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "email",
          newVaule: value,
        });
      },
    },
    phone: {
      get() {
        return this.rmaPage.phone;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "phone",
          newVaule: value,
        });
      },
    },
  },
};
</script>
<template>
  <div class="owner">
    <h2>Dane zleceniodawcy</h2>
    <div class="wrap">
      <inlineEditInput
        id="name"
        label="Imię i nazwisko:"
        v-model="name"
        :disabled="!this.editMode"
      />
      <inlineEditInput
        id="email"
        label="E-mail:"
        v-model="email"
        :disabled="!this.editMode"
      />
      <inlineEditInput
        id="phone"
        label="Telefon:"
        v-model="phone"
        :disabled="!this.editMode"
      />
    </div>
  </div>
</template>
