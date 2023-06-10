<script>
import { mapGetters } from "vuex";
import store from "../../../store";
import actionButton from "../../../parts/buttons/actionButton.vue";
import inlineEditInput from "../../../parts/inputs/inlineEditInput.vue";
import checkboxGroup2 from "../../../parts/inputs/checkboxGroup2.vue";
import waybillTable from "./waybillTable.vue";

export default {
  components: { actionButton, waybillTable, inlineEditInput, checkboxGroup2 },
  computed: {
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      editMode: "rmaPage/getRmaPageEditMode",
      getAccessories: "rmaAccessories/getAccessories",
      getAccessoriesTypes: "rmaDictionaries/getAccessoriesTypes",
    }),
    inWarehouse() {
      return this.rmaPage.inWarehouse;
    },
    ableToRegister() {
      if (this.inWarehouse) return false;
      if (![1, 8, 9].includes(this.rmaPage.status)) return true;
      return false;
    },
    sn: {
      get() {
        return this.rmaPage.device_sn;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "device_sn",
          newVaule: value,
        });
      },
    },
    issue: {
      get() {
        return this.rmaPage.issue;
      },
      set(value) {
        this.$store.commit("rmaPage/setRmaPageField", {
          field: "issue",
          newVaule: value,
        });
      },
    },
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
    accessories: {
      get() {
        return this.$store.state.rmaAccessories.accessories;
      },
      set(value) {
        this.$store.commit("rmaAccessories/setAccessories", value);
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
  methods: {
    toggleModal_createItem() {
      // store.dispatch("items/fetchAllShelves");
      let barcode = `${this.rmaPage.ticket_id}-${this.rmaPage.device_producer}-${this.rmaPage.device_cat}`;
      store.commit("items/setCreateModal_externalBarcode", barcode);
      store.commit("items/setcreateModal_externalSn", this.rmaPage.device_sn);
      store.commit("items/toggleCreateModal");
    },
    changeShelve() {
      store.dispatch("items/fetchAllShelves");
      setTimeout(() => {
        this.$router.push({
          name: "itemsChangeShelve",
          params: {
            barcode:
              this.rmaPage.ticket_id +
              "-" +
              this.rmaPage.device_producer +
              "-" +
              this.rmaPage.device_cat,
            activeShelve: this.rmaPage.shelve_id,
          },
        });
      }, 100);
    },
  },
};
</script>
<template>
  <div class="device">
    <h2>Urządzenie</h2>
    <h3>{{ rmaPage.device_cat }}</h3>
    <h3>{{ rmaPage.device_producer }} {{ rmaPage.device_name }}</h3>
    <inlineEditInput
      id="sn"
      label="SN:"
      v-model="sn"
      :disabled="!this.editMode"
    />
    <checkboxGroup2
      v-model:value="accessories"
      name="accessories"
      :options="getAccessoriesTypes"
      :disabledAll="!this.editMode"
    />

    <div class="register">
      <actionButton
        :event="toggleModal_createItem"
        display="Zarejestruj"
        v-if="ableToRegister"
      />
      <h3 v-if="inWarehouse">
        Warehouse ID: <b>#{{ rmaPage.item_id }}</b>
      </h3>
    </div>
    <div class="shelve" v-if="inWarehouse">
      <actionButton :event="changeShelve" display="Zmień lokalizacje" />
      <h3>
        Lokalizacja: <b>{{ rmaPage.code }}</b>
      </h3>
    </div>
  </div>
  <div class="issue">
    <h2>Diagnoza</h2>
    <div class="issueWrap">
      <textarea
        name="issue"
        id="issue"
        v-model="issue"
        cols="70"
        rows="10"
        :disabled="!this.editMode"
      ></textarea>
    </div>
  </div>
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
  <div class="shipment">
    <h2>Dane adresowe i przesyłki</h2>
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
  <div></div>
  <div class="waybills">
    <h2>Historia listów przewozowych</h2>
    <div class="wrap">
      <waybillTable />
    </div>
  </div>
</template>
<style scoped>
.device {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding-left: 0.5em;
}

.device h3 {
  padding: 0;
}

.issueWrap {
  padding: 0.5em;
  display: flex;
  gap: 0.6em;
}

.register,
.shelve {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.register .actionBtn,
.shelve .actionBtn {
  width: fit-content;
}

textarea:disabled {
  background-color: rgb(248, 248, 248);
}

.owner .wrap,
.shipment .wrap,
.waybills .wrap {
  margin-left: 0.6em;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
</style>
