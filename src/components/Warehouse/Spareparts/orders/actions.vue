<script>
import { mapState } from "vuex";
import store from "../../../../store";
export default {
  methods: {
    toggleNewModal() {
      store.commit("sparepartsOrders/toggleCreateModal");
    },
    toggleFindModal() {
      store.commit("sparepartsOrders/toggleFindModal");
    },
    onRefresh() {
      store.dispatch("sparepartsOrders/fetchOrdersByFilters");
    },
    onCancel() {
      if (this.editOrderMode) {
        store.commit("sparepartsOrders/toggleEditOrderMode");
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.sparepartsOrders.refreshingTable,
      editOrderMode: (state) => state.sparepartsOrders.editOrderMode,
    }),
  },
};
</script>
<template>
  <div class="actions">
    <div
      class="actionBtn"
      id="btn1"
      @click="toggleNewModal"
      :class="{ disabled: this.editOrderMode }"
    >
      <img src="@/assets/add.svg" class="addImg" /> Nowy
    </div>
    <div
      class="actionBtn"
      id="btn2"
      @click=""
      :class="{ disabled: !this.editOrderMode }"
    >
      <img src="@/assets/save.svg" class="saveImg" />Zapisz
    </div>
    <div
      class="actionBtn"
      id="btn2"
      @click="onCancel"
      :class="{ disabled: !this.editOrderMode }"
    >
      <img src="@/assets/cancel.svg" /> Anuluj
    </div>
    <div
      class="actionBtn"
      id="btn2"
      @click="toggleFindModal"
      :class="{ disabled: this.editOrderMode }"
    >
      <img src="@/assets/search.svg" class="searchImg" /> Szukaj
    </div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
