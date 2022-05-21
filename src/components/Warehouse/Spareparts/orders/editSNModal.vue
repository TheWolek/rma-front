<script>
import { mapState } from "vuex";
import store from "../../../../store";

export default {
  data() {
    return {
      codes: "",
      error_codes: "",
    };
  },
  computed: {
    ...mapState({
      editSNModal_active: (state) => state.sparepartsOrders.editSNModal_active,
      itemID: (state) => state.sparepartsOrders.orderItemsChecked[0],
      items: (state) => state.sparepartsOrders.ordersItems.items,
    }),
    minAreaHeight() {
      console.log(this.getAmount * 18 + "px");
      return this.getAmount * 18 + "px";
    },
    getAmount() {
      let item = store.state.sparepartsOrders.ordersItems.items.find(
        (o) => o.order_item_id == this.itemID
      );
      console.log(item.amount);
      return item.amount;
    },
  },
  methods: {
    toggleModal() {
      store.commit("sparepartsOrders/toggleEditSNModal");
    },
  },
};
</script>
<template>
  <div
    id="sparepartsOrderEditSNModalWrap"
    class="bigModal"
    :class="{ active: this.editSNModal_active }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" v-on:click="toggleModal"></div>
        <h4>Edycja Kodów kreskowych części w dostawie</h4>
      </div>
      <form v-on:submit.prevent="">
        <div class="form-group">
          <label for="supplier"
            >Kody kreskowe <span>Jeden kod na linijkę</span></label
          >
          <div>
            <textarea
              v-model="codes"
              :style="{ height: minAreaHeight }"
              :rows="getAmount"
            ></textarea>
            <p
              id="error_codes"
              class="error_modal_form"
              :class="{ active: this.error_codes !== '' }"
            ></p>
          </div>
        </div>
        <input type="submit" value="Zapisz" />
      </form>
    </div>
  </div>
</template>
<style scoped>
#sparepartsOrderEditSNModalWrap .form-group {
  width: 100%;
}

textarea {
  width: 100%;
}

label span {
  font-size: 0.75rem;
  line-height: 15px;
  margin-left: 0.2em;
  display: block;
}
</style>
