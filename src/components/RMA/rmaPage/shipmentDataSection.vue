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
    lines: {
      get() {
        return this.rmaPage.lines;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "lines",
          newVaule: value,
        });
      },
    },
    postCode: {
      get() {
        return this.rmaPage.postCode;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "postCode",
          newVaule: value,
        });
      },
    },
    city: {
      get() {
        return this.rmaPage.city;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "city",
          newVaule: value,
        });
      },
    },
  },
};
</script>
<template>
  <div class="shipment">
    <h2>Dane do wysyłki</h2>
    <div class="wrap">
      <inlineEditInput
        id="name"
        label="Imię i nazwisko:"
        v-model="name"
        :disabled="!this.editMode"
      />
      <inlineEditInput
        id="lines"
        label="Ulica i numer:"
        v-model="lines"
        :disabled="!this.editMode"
      />
      <inlineEditInput
        id="postCode"
        label="Kod pocztowy:"
        v-model="postCode"
        :disabled="!this.editMode"
      />
      <inlineEditInput
        id="city"
        label="Miejscowość:"
        v-model="city"
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
