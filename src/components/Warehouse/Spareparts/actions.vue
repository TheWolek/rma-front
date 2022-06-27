<script>
import { mapState } from "vuex";
import store from "../../../store";
export default {
  computed: {
    ...mapState({
      loading: (state) => state.spareparts.refreshingTable,
      detailsPageActive: (state) => state.spareparts.partDetailsPageActive,
      detailsPageSnTableActive: (state) =>
        state.spareparts.partDetailsSnTableActive,
    }),
    isGoBackActive() {
      return !this.detailsPageActive;
    },
    isSearchActive() {
      return this.detailsPageActive;
    },
    isRefreshActive() {
      return this.detailsPageActive;
    },
    isUsePartActive() {
      return !this.detailsPageSnTableActive;
    },
  },
  methods: {
    toggleFindModal() {
      if (!this.isSearchActive) {
        store.commit("spareparts/toggleFindModal");
      }
    },
    onRefresh() {
      if (!this.isRefreshActive) {
        store.dispatch("spareparts/fetchPartsByFilters");
      }
    },
    goBack() {
      if (!this.isGoBackActive) {
        store.commit("spareparts/togglePartDetailsPageActive", false);
        store.commit("spareparts/togglePartDetailsSnTableActive", false);
      }
    },
    toggleSnModal() {
      store.commit("spareparts/toggleSnModal", true);
    },
    usePart() {
      if (!this.isUsePartActive) console.log("using");
    },
    changePartShelve() {
      if (this.detailsPageSnTableActive) {
        console.log("toggle change shelve modal with active item selected");
      } else {
        console.log("toggle change shelve modal");
      }
    },
  },
};
</script>
<template>
  <div class="actions">
    <div
      class="actionBtn"
      @click="goBack"
      :class="{ disabled: this.isGoBackActive }"
    >
      <img src="@/assets/back-arrow.png" class="searchImg" /> Cofnij
    </div>
    <div
      class="actionBtn"
      @click="toggleFindModal"
      :class="{ disabled: this.isSearchActive }"
    >
      <img src="@/assets/search.svg" class="searchImg" /> Szukaj
    </div>
    <div class="actionBtn" @click="toggleSnModal" :class="{ disabled: false }">
      <img src="@/assets/barcode.svg" /> Kod kreskowy
    </div>
    <div
      class="actionBtn"
      @click="usePart"
      :class="{ disabled: isUsePartActive }"
    >
      <img src="@/assets/gear.svg" /> Użyj części
    </div>
    <div class="actionBtn" @click="changePartShelve">
      <img src="@/assets/shelve.svg" /> Zmień lokalizacje
    </div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
