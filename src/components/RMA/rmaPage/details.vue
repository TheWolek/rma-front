<script>
import { mapGetters } from "vuex";
import store from "../../../store";
import actionButton from "../../../parts/buttons/actionButton.vue";

import waybillTable from "./waybillTable.vue";

export default {
  data() {
    return {
      editMode_issue: false,
      issue: "",
      editMode_sn: false,
      sn: "",
      editMode_accessories: false,
      accessories: "",
    };
  },
  components: { actionButton, waybillTable },
  mounted() {
    this.issue = this.rmaPage.issue;
    this.sn = this.rmaPage.device_sn;
    this.accessories = this.rmaPage.device_accessories;
  },
  computed: {
    ...mapGetters({
      rmaPage: "rma/getRmaPage",
    }),
    inEditMode_issue() {
      return this.editMode_issue;
    },
    inEditMode_sn() {
      return this.editMode_sn;
    },
    inEditMode_accessories() {
      return this.editMode_accessories;
    },
    inWarehouse() {
      return this.rmaPage.inWarehouse;
    },
    ableToRegister() {
      if (this.inWarehouse) return false;
      if (![1, 8, 9].includes(this.rmaPage.status)) return true;
      return false;
    },
  },
  methods: {
    toggleEdit_issue() {
      this.editMode_issue = !this.editMode_issue;
    },
    toggleEdit_sn() {
      this.editMode_sn = !this.editMode_sn;
    },
    toggleEdit_accessories() {
      this.editMode_accessories = !this.editMode_accessories;
    },
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
    <div class="inlineEdit">
      <h3>SN:</h3>
      <input type="text" v-model="sn" :disabled="!inEditMode_sn" />
      <div class="btn" @click="toggleEdit_sn">
        <img src="@/assets/edit.svg" />
      </div>
    </div>
    <div class="inlineEdit">
      <h3>Akcesoria:</h3>
      <input
        type="text"
        v-model="accessories"
        :disabled="!inEditMode_accessories"
      />
      <div class="btn" @click="toggleEdit_accessories">
        <img src="@/assets/edit.svg" />
      </div>
    </div>
    <div class="register">
      <actionButton :event="toggleModal_createItem" display="Zarejestruj" />
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
        :disabled="!inEditMode_issue"
      ></textarea>
      <div class="btn" @click="toggleEdit_issue">
        <img src="@/assets/edit.svg" />
      </div>
    </div>
  </div>
  <div class="owner">
    <h2>Dane zleceniodawcy</h2>
    <h3>
      <b>{{ rmaPage.name }}</b>
    </h3>
    <h3 class="email">E-mail: {{ rmaPage.email }}</h3>
    <h3>Telefon: {{ rmaPage.phone }}</h3>
  </div>
  <div class="shipment">
    <h2>Dane adresowe i przesyłki</h2>
    <h3>
      <b>{{ rmaPage.name }}</b>
    </h3>
    <h3>{{ rmaPage.lines }}</h3>
    <h3>{{ rmaPage.postCode }} {{ rmaPage.city }}</h3>
    <h3 class="email">E-mail: {{ rmaPage.email }}</h3>
    <h3>Telefon: {{ rmaPage.phone }}</h3>
    <h3><b>Historia listów przewozowych:</b></h3>
    <waybillTable />
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
</style>
